# Guidelines towards FuA@FA

The goal of this section is to give you a guidance or rather guidelines to help you evolving your architecture towards FuA@FA.

As a start, the first chapter gives you some options to collect information regarding FuA@FA.

The main chapter, [checklist towards FuA](#checklist-towards-fuA), asks you questions which are important for FuA@FA.

Unfortunately, all the questions below cannot provide concrete answers - the answers always depend on the concrete component, the concrete use cases, and so on. Still, if you go through them, you have a very good and concrete base for FuA.

## Collect information about FuA@FA

Before you start to evolve your architecture in the direction of FuA, you of course have to be familiar with FuA. As you are [here](https://ea4fa.code.siemens.io/fua/00-Overview/Overview/) already, you have found a very good starting point.

There are also other options:

* Talk with [enterprise architecture](mailto:Ronny.Hendrich@siemens.com)
* Talk with your chief architect
* Participate actively in the [CoP Future Architecture @ FA](https://teams.microsoft.com/l/team/19%3a7ae8d44d44524c23b51a5dbe1270fc25%40thread.tacv2/conversations?groupId=8d30223b-611a-426e-ac79-ea99d6554a72&tenantId=38ae3bcd-9579-4fd4-adda-b42e1495d55a)

## Checklist towards FuA

This chapter asks you questions which are important for FuA@FA.

Each question contains a short explanation, some general hints how this point can be fulfilled, and concrete positive or maybe negative examples. Partly further information (links or contacts) is available.

Please note:

* This chapter focuses on principles which have changed because of FuA - other principles, like considering NFRs from the start, remain
    * So, do not consider these questions as a complete list
* There is no prioritization of the questions, and they are not meant as step by step.

### How did you anticipate change in your architecture?

As described in [FuA Overview](../20-FuA_Overview/FuA_Overview.md#architecture-principle-design-for-change), it is quite important that your architecture anticipates change - maybe your component shall be used in a future product you do not even know today.

Here are some examples, how this could be achieved:

* Support more operating systems (not just windows)
* Support Containerization
* Modular structure (see also [API First](#how-do-you-consider-aPI-first))
* [Loose coupling](#how-do-you-realize-loose-coupling-in-your-sW)
* [Be independent from a specific product](#how-did-you-build-your-sW-independent-from-a-specific-product,-i.e.-how-can-it-be-re-used-in-other-products)
* Support Federation (e.g. for authentication systems like UMC)
* API abstraction adapters
* Hide database layout
* Avoid hard dependencies to e.g. infrastructure or IT-services like authentication

A good example is the user interface of WinCC Unified:

* It was built based on the existing WinCC V7 user interface
* It supports different rendering technologies ("rendering hosts" are implemented based on the technology, e.g. Qt-based for the HMI panels, and web-based for SCADA), while the UI business logic is independent from the rendering host and therefore exists only once.
* The interface to the HMI/SCADA core (Iowa) is abstracted via dataSources.
* It is used as a web user interface for view of things, the web server running in the PLC, completely independent from the HMI/SCADA core.

A (theoretical) good example would be a WinCC Unified compiler, which can be used in the TIA portal as well as outside of the TIA portal (WebES, IT like ES).

For more information, contact [Klaus Jandl](mailto:klaus.jandl@siemens.com).

### How do you realize loose coupling in your SW?

A loosely coupled system is one in which each of its components has, or makes use of, little or no knowledge of the definitions of other separate components. Loose coupling does not only have advantages, it also comes with a price - therefore, the first question you have to answer is, how much loose coupling do I need, and how much loose coupling can I afford? If your component is very specialized, chances are high that it will never be needed somewhere else. If your component is managing users and rights, chances are high that many products could make use of it.

E.g., the TIA portal offers a perfect integration of PLC and HMI, but for the price of a very tight coupling.

For more information, check the [Integration Guidance](Integration_Guidance.md).

Loose coupling is about autonomy. Think about:

* Reference Autonomy
    * Caller and callee don’t know each other
* Time Autonomy
    * Caller and callee execute at their own pace
* Format Autonomy
    * Caller and callee may use different formats of data exchanged
* Platform Autonomy
    * Caller and callee may be in different environments, written in different languages, ...

Here are some examples to address these issues:

* [Use clear interfaces](#how-do-you-consider-aPI-first)
* Use versioned interfaces, keep old versions (Release Management)
* Support binary compatibility
* Do not force your consumers to specific versions of underlying infrastructure like .Net-version, ...
* Offer your interfaces in a way that they can be accessed by different programming languages (polyglott), e.g. by using [gRPC](https://grpc.io/), [Apache thrift](https://thrift.apache.org/) or others for your RPC-communication
* Use standard data formats like XML or JSON/YAML
* Model-based approach, with generic implementation or generated code (see example below)

Some good examples with loose coupling:

* S7DOS, ALM, UMC keep their interfaces binary compatible - the versions can be updated without an effect on the consumers
* AX has independently releasable parts of product
* The Communication driver framework from WinCC Unified/Iowa is providing a binary compatible interface - drivers built by customers with an old version of the compiler for an old version of WinCC Unified/Iowa can still be used with a later version of WinCC Unified/Iowa
* WinCC Unified allows to build a distributed system with different versions of WinCC Unified, offering full functionality
* IT like Engineering (document based engineering for HMI) is built in a generic way; the model description is provided in XML-files, and you get a language server, Yaml parser, Yaml serializer, and a high-level API via gRPC just by defining your model

For more information, contact [Klaus Jandl](mailto:klaus.jandl@siemens.com).

One example in a little more detail:

A good example is the screen model in WinCC Unified, where runtime and engineering are decoupled as follows:

* The screen model is described using a DSL, implemented with the [Modeling SDK for Visual Studio](https://docs.microsoft.com/en-us/visualstudio/modeling/getting-started-with-domain-specific-languages).
* With [T4-templates](https://en.wikipedia.org/wiki/Text_Template_Transformation_Toolkit), code is generated automatically based on the model
* The screen model is maintained by the runtime team, and the generated code is used in the TIA Portal/WinCC ES.

For more information, contact [Karlheinz Langguth](mailto:karlheinz.langguth@siemens.com).

### How do you consider API first

API driven design ("API first") is motivated by the idea that an API defines the first interface from an application to a consumer, may it be a test application, another application of a system, or a user outside the system.

A major advantage of this approach is that it fosters modular, reusable components (e.g. clear separation of User Interface and business logic).

For more information, see [API Guidance](API_Guidance.md#aPI-driven-design-("aPI-first")).

A good example is AX, where almost all tools can be operated via command line interface. For more information, contact [Christian Metz](mailto:metz.christian@siemens.com).

Another good example is the Iowa Chrom API, where a clear meta model is defined, and all services must follow this meta model. For more information, contact [Robert Trausmuth](mailto:robert.trausmuth@siemens.com).

### Which future trends did you take into account?

Unfortunately we cannot tell you here which future trends you should take into account, we can just give you some examples:

* Automation pyramid dissolves
* IT/OT convergence
* Trend towards open standards
* Lot size one
* future trends in automation engineering are discussed in [BBT EE]

 More generally:

* Please think about future trends in your area, and even if they are not mature yet and required for the first version, consider them in your architecture.
* Talk to innovative people - no matter if they are architects, product managers, product owners, ... - and discuss this topic with them

A good example regarding considering future trends is the startup AX (part of DI FA CTR EE). They considered at least:

* SaaS-approach for PLC engineering
* Document based persistency
* [Language server protocol](https://microsoft.github.io/language-server-protocol/)
* Support of RIB (Realtime Interconnection Bus)

More information can be found on the [AX website](https://axciteme.siemens.com/), or contact [Christian Metz](mailto:metz.christian@siemens.com).

### Which standards do you consider? Do you prefer standards over proprietary definitions?

The whole idea of the [open automation ecosystem](../80-Impact/BTTs.md#bTT1a---open-automation-ecosystem) is based on openness - integrate software from other vendors, and be able to integrate our software into software from other vendors, where other vendors can be e.g. IT-players, partners or competitors ("Coopetition").

A very important base to achieve this is to use standards, e.g. for

* Communication on different layers (OPC UA, DDS, MQTT, 5G, GraphQL, gRPC, ...)
* Data format (XML, JSON, YAML, ...)
* Data content (OPC UA data model, MTP, ...)
* ...

Think carefully about which standards do exist in your area, and wherever feasible, prefer standards over proprietary definitions.

A good example is to provide northbound and southbound communication via OPC UA, or to provide semantic information via OPC UA companion specs. Also towards IT, supporting standards (e.g. for authentication, or certificate distribution) is crucial.

### How did you consider make or buy?

Often it is not necessary to implement "everything" on your own. Think about:

* Are there open source projects available which can be used (don't forget open source clearance)?
* Can I use components available inside Siemens (inner source or commercially used)?
* Is there commercial software available on the market? Could it make sense to buy a company?
* If you have to go to the cloud, consider Lift & Shift instead of rewriting

Also the other way round is interesting. If your component is of general interest, think about offering as inner source / open source

Some good examples:

* Build your OPC UA Client/Server based on an existing framework/SDK, e.g. from [Unified automation](https://www.unified-automation.com/)
* If you need an embedded database, use [SQLite](https://www.sqlite.org/)
* For use of semantic technology, take a look at the semantic pipeline from [T RDA BAM](mailto: steffen.lamparter@siemens.com)
* If you need a powerful web-based editor, consider [VSCode](https://github.com/cdr/code-server) or [Theia](https://theia-ide.org/)
* Consider using [gRPC](https://grpc.io/), [Apache thrift](https://thrift.apache.org/) or others for your RPC-communication
* Using [Wibu CodeMeter](https://www.wibu.com/products/codemeter.html) for licensing / license management

### How did you build your SW independent from a specific product, i.e. how can it be re-used in other products?

Software is often designed in the context of a specific product environment, in which it is supposed to run. Such environments provide infrastructure that the new software can leverage or which it has to be integrated in. Main pain points in reuse of software are UI integration, persistence, communication, user management services, and integration in data/business models of a product suite. The latest is particularly relevant if consistence between models of different applications must be provided - as in automation programming.

The way out is to modularize the software such that the core functionality, working on the "business model" or data model the software is targeting, is separated from the infrastructure. An integration in other products shall not change the core of the software, but happens in the "adapter" layer that encapsulates the product specific environment from the core functionality.  

### How is your SW independent from the execution environment (HW-SW decoupling)?

SW is independent from hardware if the SW can be created and compiled with only minor assumptions on the hardware it runs on. Traditionally, these assumptions are either API functions of the underlying operation system or encoded in the compiler, which selects the target hardware. If a cloud deployment is planned, the deployment configuration under which the SW is supposed must be defined, and the cloud provider restrictions must be understood to avoid or be aware of a cloud vendor lock-in.

The first widespread successful example of SW running independent from the hardware, even of the operating system, was Java. Software engineered independent of the hardware started with high level programming languages like [Fortran](https://en.wikipedia.org/wiki/Fortran) as early as 1957.

Automation programming is today the opposite from hardware independent, probably the most hardware dependent programming art existing above ASIC programming.

### Openness - how can your SW be operated with UI and fully without UI by customers?

Often part of the business logic is encoded in the UI, because it seems more natural to check user actions directly in the UI code or presentation layer. Mostly wrong! Instead, the business logic shall be implemented independent from the UI, with the idea that it could be used as a service. That makes the SW easier to test automatically, but also allows to be used outside the original graphical framework.

As a consequence, the access to the functions and data of application must be considered, here the [API First](#how-do-you-consider-aPI-first) paradigm plays the central role.  

The TIA components can currently not be used without UI, even if the business logic is already separated and is accessible via TIA openness. This is a drag for users of TIA functionality like WebES, PCS-neo or from building automation, but also for customers who want to use TIA openness to configure a TIA project in machinery.

Another area where openness is important is connectivity - be it southbound, or northbound, esp. towards IT-friendly interfaces.

A good example is the  HMI openness strategy - for more information, contact [Klaus Jandl](mailto:klaus.jandl@siemens.com).

### Open Ecosystem: How did you consider strategic Openness / open ecosystem?

Strategic openness is the idea to give access to selected functionalities of your application by strategically supported stable interfaces, eventually independent of the used programming languages. "Selected" means that it is a deliberate decision what is provided by the openness, guided for example by the idea of control points - which points are defined where we do NOT want to be open, in order not to endanger the own business - think carefully about this. Becoming part of an "open ecosystem" defines the ability to integrate and cooperate in an system of entities, both for engineering applications and runtime systems. Open is the ecosystem if participants can come from different vendors, and that the integration is almost effortless if the integration prerequisites of the ecosystems are met.

Examples of openness are the TIA Openness API, which unfortunately changes a bit fast between version giving user of the API headache, or the Teamcenter Web API, which guarantees stability for three versions after announcement from discontinuation and is strictly managed.

Examples of an ecosystems are the Google playStore, being an ecosystem of apps. Note that such ecosystems formulate restrictions and might have to provide an deployment and runtime infrastructure, as the Google Apps on Android show, which must be respected by your application.

### How do you integrate IT-services, e.g. identity systems?

A IT-service delivers a functionality in a flexible way that you do not want to implement by yourself and for which you do not want to bind too closely.

For a given IT-service you want to create hooks that are automatically used in a given situation for a well defined purpose. Typically a configuration declares which service is called, and there exists standards on how to call it, such as SOAP, REST, or XML-RPCs. Note that such IT-service implementations may change fast, so a flexible way of exchanging them is necessary. There are some architectural patterns like Observer or Visitor that allow controlled access of services to your data or calls to services with your data.

An example are authentication systems based on OAuth 2.0 and used in AX, or source control system interfacing using MSSCCI.

There are some architectural patterns like Observer or Visitor that allow controlled access of services to your data or calls to services with your data.  

### Is your engineering business logic usable in other frameworks?

Applications are often separated into a presentation layer, a business logic layer and an implementation layer; this idea originated in the [ANSI-SPARC schema](https://en.wikipedia.org/wiki/ANSI-SPARC_Architecture) from 1975. The business layer defines the "universe of discourse" of the area that should be independent from implementation and presentation. In todays speech, the business model is constituted by the semantic and the workflows of a engineering activity.

As example, the [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) syntax of a formal language is a way to define the concepts and semantic of a programming language and can be used in several compiler generator frameworks. The business logic of a language can also be encapsulated in a concrete compiler, that is independent of the framework it runs in. A bad example is the parser or compiler in TIA that cannot be used outside the TIA framework, and that does not allow other editors than the TIA editor. Another example is the business logic for CAD data in Teamcenter, defined in the BMIDE of Teamcenter.

The examples show that it is preferable to either clearly encapsulate the business model in code, independent of presentation, runtime, or persistence layer, or to explicitly use a Meta modeling framework to formulate the business logic explicitly and generate runtime code from it.

### Does your engineering support document-based persistence?

Document-based persistence means that the artefacts created in the engineering application can be exported as documents or files, instead of putting them e.g. into a database. Some requirements on this are:

* the document has a suitable granularity and internal consistency
* relations to other documents are well defined
* the document shall be human readable; version differences shall be easy to understand because local changes in engineering remain local
* either the native artefact format, as in textual programming languages, or a standard format, like YAML or JSON, should be used that have standard parser, diff support, and allow format or schema definitions
* for graphical languages special formats that preserve the structure of the language to enable merges are often necessary

For more information, check the [Guidelines for document based engineering](../80-Impact/doc-based-engineering.md)

A positive simple example is a .csv format, as defined in RFC 4180  [CSV](https://de.wikipedia.org/wiki/CSV_(Dateiformat)) and used for the X-Ref table in S7 Classic. The simulation system [Amesim](https://www.plm.automation.siemens.com/global/de/products/simcenter/simcenter-amesim.html)) uses Python as export format for simulation models, making them executable . Programming environments like Visual Studio or AX use the plain program text for textual languages, and self-defined formats as textLAD in AX for graphical languages. Graphs are easily readable by the .dot format.

Bad practice is the use of XML in the TIA export for 61131-3 languages, and similarly [PLM XML](https://www.plm.automation.siemens.com/global/de/products/plm-components/plm-xml.html) in Teamcenter, because hard to parse, unreadable, and full of references to be resolved; the same applies for the [XMI](https://de.wikipedia.org/wiki/XMI) export of UML authoring IDEs, such as MagicDraw or Enterprise Architect. [GraphML](http://graphml.graphdrawing.org/) is an example of an unhandy format for graphs.
