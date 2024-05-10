# API Guidance

:exclamation: *Work in Progress*

The possible guidelines may be of value.

- *API Type Guidelines*: Which API standards or protocols to use?
- *API Design Guidelines*: How Should APIs look like and how to tackle common design challenges?
- *API Lifecycle Guidelines*: Which phases should published APIs go through and how can APIs be evolvable?
    - Versioning, Backwards compatibility, Robustness principle, Design for evolution
- *API Documentation Guidelines*: What is good API documentation made of and which specification standards and tools to use?
- *API Development Guidelines*: What are good development workflows for APIs?
- *API Security Guidelines*: Which standards and approaches to use for API security?

External input:

- [adidas API Guidelines](https://adidas.gitbook.io/api-guidelines/): Guidelines for the API design and development at adidas
- [Zalando RESTful API and Event Scheme Guidelines](https://adidas.gitbook.io/api-guidelines/): defines standards to successfully establish "consistent API look and feel" quality
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines/): Microsoft's internal company-wide REST API design guidelines

## IoT Board: API Governance Team

Within the Siemens IoT Board, an API Governance Team is working on guidelines for the future IoT Platform. This activity is a good source of input of Siemens wide activities around API guidelines and API management. The current results are published on the [IoT Platform Developer Portal](https://iot-platform.code.siemens.io/guidance/api/). A first version of API Guidelines was released recently (Sept 2021) and include:

- API Specification Guidelines
- API Documentation Guidelines
- API Versioning Guidelines
- REST API Design Guidelines

The ongoing activities of the API guidance team can be followed at the [status pages](https://code.siemens.com/iot-platform/iot-platform.code.siemens.io/-/wikis/IoT-Platform-API-Governance/00-Overview). Current activities include:

- Asynchronous API Design Guidelines
- API Lifecycle Guidelines
- API Security Guidelines (based on [IAM guidelines](https://iot-platform.code.siemens.io/guidance/iam/))
- Reference API Spec (example)
- API Spec Linting (tooling guideline)

## API driven design ("API first")

API driven design is motivated by the idea that an API defines the first interface from an application to a consumer, may it be a test application, another application of a system, or a user outside the system. It makes the API the main requirement of the implementation and treats it as “first-class citizen". It is an extension of contract-first principle and involves developing APIs that are consistent and reusable. Establishing a contract involves spending more time thinking about the design of an API. It also often involves additional planning and collaboration with the stakeholders providing feedback on the design of an API before code is written.

Some advantages are:

- Domain knowledge first
- A part of the overall customer base can be addressed early
- Faster release cycles
- Openness by design, everything is accessible via APIs
- Fosters modular, reusable components (e.g. clear separation of user interface and business logic)
- Improves Testability

APIs not only define the used protocol to access functionality, such as command line API, .net API, REST API, but also the semantic of the API and what behavior is expected when calling the API.
Some best practices for defining good APIs:

- The semantic of an API should be clear and centered around the customer needs
- The semantic and use of an API should be understandable for the customer (e.g. via test stub, or application example)
- Fast feedback is important for internal as well as external customer, consider shipping as early as possible (e.g. just API definition, just the API without GUI)
- APIs have a lifecycle policy that must be clearly communicated
- Good documentation or a self-descriptive API
