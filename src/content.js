export const articles = [
  {
    title: 'Create Extension with Codex',
    slug: '/blog/create-extension-with-codex',
    read: '14 min read',
    category: 'Autonomous Coding Agent',
    description:
      'Learn how Codex can help Business Central extension development and which AL skills you still need.',
    intro:
      'Codex can speed up Business Central extension development, but it works best when the developer still understands AL, app structure, object design, permissions, and testing. Think of Codex as a fast pair developer: it can inspect your project, draft objects, explain compiler errors, suggest refactors, and create review checklists, while you remain responsible for business rules and final validation.',
    sections: [
      {
        heading: 'How Codex helps Business Central developers',
        body:
          'Codex is useful when a Business Central task needs repository context. It can inspect app.json, scan existing AL objects, find naming patterns, suggest available object ids, draft table extensions and page extensions, explain compiler messages, and prepare test cases. It is not a replacement for process knowledge. It is a development agent that helps you move faster when you already know what the extension should do.',
        bullets: [
          'Project inspection: app.json, id ranges, dependencies, folders, and naming conventions.',
          'AL drafting: table extensions, page extensions, codeunits, event subscribers, enums, reports, and permission sets.',
          'Debug support: compiler error explanation, missing symbol checks, and targeted fixes.',
          'Review support: object id conflicts, captions, ApplicationArea, DataClassification, permissions, and upgrade risk.',
          'Documentation support: release notes, setup steps, user acceptance test scripts, and developer handover notes.'
        ]
      },
      {
        heading: 'Skills you still need before using Codex',
        body:
          'The better your Business Central fundamentals are, the better Codex becomes. You do not need to memorize every AL detail, but you should know enough to judge whether the generated solution belongs in a table trigger, a page action, a codeunit, or an event subscriber. You should also understand when a change affects data, posting behavior, permissions, or upgrade safety.',
        bullets: [
          'AL basics: objects, fields, triggers, procedures, records, pages, codeunits, enums, and events.',
          'Business Central architecture: base application tables, document flow, posting routines, setup records, and permissions.',
          'Extension design: app.json, id ranges, dependencies, translations, upgrade codeunits, and breaking changes.',
          'Source control: branches, commits, diffs, pull requests, and rollback strategy.',
          'Testing discipline: sandbox publishing, role-based testing, edge cases, and user acceptance testing.'
        ]
      },
      {
        heading: 'Step 1: Open the AL project and ask Codex to inspect it',
        body:
          'Start by opening the Business Central extension folder in Codex. Do not begin with a broad request like build my extension. Ask Codex to inspect the project first so it understands the existing structure before editing files.',
        code:
          'Inspect this Business Central AL project. Find app.json, the allowed object id range, existing object naming patterns, and any page or table extensions. Do not edit files yet. Summarize what you found and tell me which ids are available for a new Customer feature.'
      },
      {
        heading: 'Step 2: Give Codex one focused development task',
        body:
          'Codex performs better when the task is small, specific, and tied to Business Central objects. A good request names the target table or page, the field or action to create, the business reason, the placement, and the constraints. For example, you can ask it to add a Customer field and place it on the Customer Card.',
        code:
          'Create a Business Central extension change that adds a Boolean field named AI Review Required to table 18 Customer. Add the field to page 21 Customer Card in the General fast tab after Blocked. Use object ids from this project app.json range, follow the existing object naming style, add useful captions and tooltips, and create or update permissions if this project uses permission sets. After editing, explain every file changed.'
      },
      {
        heading: 'Step 3: Review the generated AL objects',
        body:
          'A clean result should use object ids inside your range, field ids that will remain stable, user-friendly captions, useful tooltips, and extension-safe object types. For a simple field, avoid complicated triggers unless there is a real business rule. Keep the first version simple and easy to upgrade.',
        code:
          "tableextension 50100 CustomerAIReview extends Customer\n{\n    fields\n    {\n        field(50100; \"AI Review Required\"; Boolean)\n        {\n            Caption = 'AI Review Required';\n            DataClassification = CustomerContent;\n        }\n    }\n}"
      },
      {
        heading: 'Step 4: Build, publish, and review',
        body:
          'After Codex edits the files, build the extension with the AL compiler. If you get an error, copy the exact message back to Codex and ask it to fix only that error. Then publish to a sandbox and test with a real user role before packaging the app.',
        bullets: [
          'Check for duplicate object ids, missing symbols, invalid page anchors, and field naming issues.',
          'Verify the field appears in the expected page area and persists after reopening the record.',
          'Verify permissions for normal users, not only SUPER users.',
          'Ask Codex for a final review focused on AL naming, captions, ApplicationArea, DataClassification, permissions, and upgrade safety.'
        ]
      }
    ],
    takeaways: [
      'Codex is strongest when it can inspect the whole AL project before editing.',
      'Business Central developers still need AL, functional process, extension design, source control, and testing skills.',
      'Use focused prompts that name the table, page, field, placement, business rule, and constraints.',
      'Always review generated AL before publishing to a sandbox or production environment.'
    ]
  },
  {
    title: 'GitHub Copilot for Business Central AL Development',
    slug: '/blog/github-copilot-business-central-al',
    read: '8 min read',
    category: 'IDE Coding Assistant',
    description:
      'Use GitHub Copilot inside Visual Studio Code to speed up AL object drafting, comments, and small refactors.',
    intro:
      'GitHub Copilot is useful for Business Central developers who spend most of their day inside Visual Studio Code. It shines as an inline assistant for completing AL procedures, drafting repetitive object structure, generating comments, and explaining nearby code.',
    sections: [
      {
        heading: 'Where Copilot fits',
        body:
          'Copilot works best when the file already has strong local context. If you are editing a page extension, it can infer field patterns. If you are writing an event subscriber, it can help draft procedure shape and variable names. Keep the task local and review the output carefully.',
        bullets: [
          'Fast inline completion for AL object skeletons.',
          'Helpful suggestions for repetitive field, action, and layout blocks.',
          'Quick explanations for unfamiliar code sections.',
          'Small refactors where the expected change is already clear.'
        ]
      },
      {
        heading: 'Skills needed',
        body:
          'Developers still need to understand AL syntax, Business Central object types, event subscribers, record operations, and the difference between UI behavior and system-of-record validation. Copilot can fill in code quickly, but you decide whether the code belongs in that object.'
      },
      {
        heading: 'A practical prompt',
        body:
          'Use Copilot Chat when inline completion is not enough. Give it the object, target behavior, and constraints.',
        code:
          'In this AL page extension, add an action that calls an existing codeunit procedure to analyze the current customer. Keep the action in the Processing group, use ApplicationArea = All, and do not create new tables.'
      }
    ],
    takeaways: [
      'Copilot is best for fast code drafting inside Visual Studio Code.',
      'It needs nearby AL context to produce useful suggestions.',
      'Review generated code for object placement, permissions, and Business Central behavior.'
    ]
  },
  {
    title: 'ChatGPT as a Business Central Solution Design Agent',
    slug: '/blog/chatgpt-business-central-solution-design',
    read: '9 min read',
    category: 'Design and Prompt Agent',
    description:
      'Use ChatGPT to plan Business Central extension design before writing AL code.',
    intro:
      'ChatGPT is useful before coding starts. It can turn a vague business request into user stories, object candidates, acceptance criteria, risks, and test scenarios. For Business Central projects, this design step matters because the wrong object boundary can create upgrade, posting, or permission problems later.',
    sections: [
      {
        heading: 'Use ChatGPT for requirements shaping',
        body:
          'Before creating AL files, ask ChatGPT to clarify the workflow, affected roles, master data, posting impact, and exception cases. This gives the developer a better brief before asking a coding agent to modify the repository.',
        bullets: [
          'Break business requests into user stories and acceptance criteria.',
          'Identify affected pages, tables, reports, integrations, and setup records.',
          'List risks around posting, permissions, auditability, and upgrades.',
          'Create a first test checklist for sandbox validation.'
        ]
      },
      {
        heading: 'Skills needed',
        body:
          'You need functional Business Central knowledge to evaluate the design. ChatGPT may suggest a technically possible customization that does not fit standard process. The developer or consultant must confirm whether the design respects standard setup, approvals, and posting controls.'
      },
      {
        heading: 'A practical prompt',
        body:
          'Use ChatGPT to refine the request before handing the implementation to Codex or another coding agent.',
        code:
          'Act as a Business Central solution architect. Convert this request into extension requirements: users need AI-assisted customer review before approving credit limit changes. Identify AL objects likely needed, standard features to reuse, risks, permissions, and sandbox test cases.'
      }
    ],
    takeaways: [
      'ChatGPT is strong for solution framing, prompts, and test planning.',
      'Use it before coding to reduce rework.',
      'A Business Central expert must validate the process design.'
    ]
  },
  {
    title: 'Cursor and Windsurf for Business Central Codebase Navigation',
    slug: '/blog/cursor-windsurf-business-central',
    read: '7 min read',
    category: 'Codebase Navigation Agent',
    description:
      'Use AI-first editors to navigate AL projects, understand dependencies, and make multi-file changes.',
    intro:
      'AI-first editors such as Cursor and Windsurf are useful when the Business Central project has many AL files and the developer needs to understand relationships quickly. They help search the codebase, explain object dependencies, and make scoped multi-file edits.',
    sections: [
      {
        heading: 'Where codebase agents help',
        body:
          'A Business Central extension often spreads one feature across table extensions, page extensions, codeunits, permission sets, tests, and documentation. Codebase navigation agents help connect those files so a developer can see the change surface before editing.',
        bullets: [
          'Find every object related to a feature or prefix.',
          'Explain how a setup table, codeunit, and page action work together.',
          'Apply similar changes across multiple AL objects.',
          'Summarize a pull request for a reviewer.'
        ]
      },
      {
        heading: 'Skills needed',
        body:
          'Developers need source-control discipline. Multi-file AI edits can be powerful, but they must be reviewed with diffs, builds, and sandbox tests. You should know how to reject unrelated edits and keep the change focused.'
      },
      {
        heading: 'A practical prompt',
        body:
          'Start by asking the agent to map the feature instead of editing immediately.',
        code:
          'Find all AL objects related to customer credit review. Summarize each file, explain the flow, identify the safest extension point for adding an AI review flag, and do not edit files yet.'
      }
    ],
    takeaways: [
      'Codebase agents are useful for large AL repositories.',
      'Ask for a map before asking for edits.',
      'Review every multi-file change through source control.'
    ]
  },
  {
    title: 'Claude for AL Code Review and Business Central Documentation',
    slug: '/blog/claude-al-code-review-documentation',
    read: '8 min read',
    category: 'Review and Documentation Agent',
    description:
      'Use AI review agents to check AL code, explain decisions, and produce implementation documentation.',
    intro:
      'Some AI agents are especially useful for review and writing. In a Business Central project, this means checking AL changes for risk, producing release notes, explaining setup steps, and turning developer decisions into documentation that consultants and users can understand.',
    sections: [
      {
        heading: 'Review before merge',
        body:
          'A review agent should inspect the diff and report risks first. For AL, the review should focus on object ids, permissions, captions, ApplicationArea, DataClassification, event subscriber placement, transaction timing, and upgrade safety.',
        bullets: [
          'Find missing captions, tooltips, and ApplicationArea properties.',
          'Check for risky hard-coded users, dates, dimensions, or company names.',
          'Flag event subscribers that may run inside sensitive posting flows.',
          'Suggest sandbox tests for the changed process.'
        ]
      },
      {
        heading: 'Documentation skills still matter',
        body:
          'AI can draft documentation, but the developer must confirm the setup sequence, limitations, and real business impact. Good documentation should explain what changed, who uses it, how to configure it, and how to test it after deployment.'
      },
      {
        heading: 'A practical prompt',
        body:
          'Use a review prompt that asks for findings before edits.',
        code:
          'Review this AL pull request for Business Central. Prioritize bugs, upgrade risks, permission gaps, missing captions, missing DataClassification, and test gaps. Give findings first with file references. Do not rewrite code unless asked.'
      }
    ],
    takeaways: [
      'Review agents are useful after code is drafted.',
      'Ask for risks and test gaps before asking for rewrites.',
      'Use AI-generated documentation as a draft that must be verified.'
    ]
  },
  {
    title: 'Custom Business Central Coding Agents',
    slug: '/blog/custom-business-central-coding-agent',
    read: '10 min read',
    category: 'Custom ERP Agent',
    description:
      'Design a custom AI coding agent that understands your Business Central project standards.',
    intro:
      'A custom Business Central coding agent is useful when your team has repeated project rules: object prefixes, id ranges, naming conventions, folder structure, localization standards, permission set patterns, and release checklist requirements. Instead of repeating those instructions in every prompt, you can encode them into an agent workflow.',
    sections: [
      {
        heading: 'What the custom agent should know',
        body:
          'The agent should understand your project rules, but it should not bypass developer review. Give it stable instructions for inspecting app.json, checking object ids, following naming conventions, and producing a build-and-test summary.',
        bullets: [
          'Project prefix and object naming rules.',
          'Allowed object id and field id ranges.',
          'Folder and file naming structure.',
          'Required captions, tooltips, DataClassification, and ApplicationArea.',
          'Definition of done for build, sandbox publish, and role-based testing.'
        ]
      },
      {
        heading: 'Skills needed',
        body:
          'Building a custom agent requires prompt design, repository knowledge, AL standards, and CI or build-script awareness. The team should define what the agent may edit automatically and what requires human approval.'
      },
      {
        heading: 'A starter instruction',
        body:
          'Start with a small policy that the agent follows every time.',
        code:
          'For every Business Central AL change: inspect app.json first, stay inside the id range, follow existing object names, avoid base object modification, add captions and DataClassification, run the available build command, and summarize changed files plus remaining test gaps.'
      }
    ],
    takeaways: [
      'Custom agents are best for teams with repeatable AL standards.',
      'Encode project rules so prompts stay shorter and safer.',
      'Keep human review and sandbox testing in the workflow.'
    ]
  },
  {
    title: 'Enable MCP Server for Business Central AL Troubleshooting',
    slug: '/blog/bc-mcp-server-al-troubleshooting',
    read: '10 min read',
    category: 'Custom ERP Agent',
    description:
      'Set up the Business Central MCP Server for AL and connect AI coding agents directly to compiler diagnostics in your development workflow.',
    intro:
      'The Model Context Protocol (MCP) Server for AL is generally available in Business Central 2026 Wave 1 update 28.1. It allows AI coding agents that support MCP — such as Claude, Copilot in agent mode, and compatible tools — to connect directly to Business Central AL compiler diagnostics. Instead of copying error messages manually into a chat window, the agent can read diagnostics through the MCP connection and propose targeted fixes within the same session.',
    sections: [
      {
        heading: 'What the MCP Server for AL does',
        body:
          'The MCP Server for AL exposes Business Central AL project diagnostics as a structured data source that MCP-compatible AI agents can query. The agent can read compiler errors, extension conflicts, symbol resolution issues, and object id problems without the developer manually copying output between tools. This shortens the iteration loop between writing AL code and resolving build errors.',
        bullets: [
          'Direct compiler diagnostic access for AL projects in Visual Studio Code.',
          'Symbol and object resolution context available to the connected agent.',
          'Reduces manual copy-paste between AL compiler output and AI chat.',
          'Supports MCP-compatible agents including Claude, GitHub Copilot agent mode, and others.'
        ]
      },
      {
        heading: 'Setting up MCP Server for AL',
        body:
          'The MCP Server for AL is enabled through the AL Language extension in Visual Studio Code. Once enabled, configure your MCP-compatible AI client to connect to the server endpoint. The setup requires the AL Language extension version that ships with Business Central 2026 Wave 1 update 28.1 or later.',
        bullets: [
          'Update the AL Language extension to a version compatible with Business Central 2026 Wave 1.',
          'Enable the MCP Server option in the AL extension settings inside VS Code.',
          'Add the MCP server endpoint to your AI client configuration.',
          'Verify the connection by asking the agent to read the current diagnostic output.'
        ]
      },
      {
        heading: 'Using MCP with an AI coding agent',
        body:
          'With the MCP connection active, you can ask the agent to read the current build state and propose fixes without providing the error text yourself. The workflow becomes: write code, trigger a build, ask the agent to check diagnostics, review the proposed fix, apply it, and rebuild.',
        code:
          'Inspect the current AL project diagnostics through the MCP connection. List all errors and warnings, explain each one in plain language, and propose a minimal targeted fix for each error. Do not modify files yet.'
      },
      {
        heading: 'What MCP does not replace',
        body:
          'The MCP Server provides compiler diagnostics, not business process knowledge. The agent still cannot know your functional requirements, posting rules, or approval workflows. You need to guide the agent on what the code should do — MCP only helps it see what the code currently does wrong according to the compiler.',
        bullets: [
          'The agent still needs your AL object naming conventions and id ranges.',
          'Business rules, posting logic, and permission design remain developer responsibilities.',
          'MCP diagnostic context does not include runtime errors from sandbox testing.',
          'Always review proposed fixes before applying, especially for event subscribers and posting routines.'
        ]
      }
    ],
    takeaways: [
      'MCP Server for AL is generally available in Business Central 2026 Wave 1 update 28.1.',
      'It lets MCP-compatible agents read AL compiler diagnostics directly without manual copy-paste.',
      'Setup requires the updated AL Language extension and an MCP-compatible AI client.',
      'MCP reduces error-copy friction but does not replace developer knowledge of business process.'
    ]
  },
  {
    title: 'Business Central Expense Agent — What Developers Need to Know',
    slug: '/blog/business-central-expense-agent',
    read: '9 min read',
    category: 'Autonomous Coding Agent',
    description:
      'Understand what the Business Central Expense Agent does, how it evolves through 2026, and what AL developers should know before extending Expense Management.',
    intro:
      'The Expense Agent is the first fully autonomous AI agent shipped inside Business Central. Introduced in public preview with the 2026 Wave 1 release, it handles expense extraction from receipts, duplicate detection, report generation, approval workflow routing, and reimbursement posting — all within the standard Expense Management module. For AL developers, this means a new extensible AI workflow with significant new capabilities planned for July 2026.',
    sections: [
      {
        heading: 'What the Expense Agent does today',
        body:
          'In its current preview form, the Expense Agent can extract expense data from uploaded receipt images, detect duplicate submissions, generate expense reports, route them through the existing approval workflow, and post reimbursements. It works inside the standard Business Central Expense Management module without requiring custom AL code to activate.',
        bullets: [
          'Receipt image extraction using AI document intelligence.',
          'Duplicate expense detection across the submission period.',
          'Automatic expense report generation from extracted line data.',
          'Integration with existing Business Central approval workflows.',
          'Reimbursement posting through the Expense Management posting routine.'
        ]
      },
      {
        heading: 'What is coming in July 2026',
        body:
          'Microsoft has announced several Expense Agent capabilities scheduled for public preview in July 2026. These include approval process enhancements, mobile app capture, travel requisition management, and localization support for German, Danish, French, and Spanish. AL developers working on expense extensions should plan for these additions.',
        bullets: [
          'Full approval process support for the Expense Agent workflow.',
          'Mobile app expense capture using the Expense Agent.',
          'Travel requisition management integrated with the agent.',
          'Localization in German, Danish, French, and Spanish.'
        ]
      },
      {
        heading: 'What AL developers should check before extending Expense Management',
        body:
          'Before writing AL extensions that touch the Expense Management module, review the agent\'s expected event flow. The Expense Agent introduces new posting paths and approval states that an extension may need to handle. Adding fields to expense tables or modifying approval logic without understanding the agent flow can cause duplicates, incomplete approvals, or posting failures.',
        code:
          'Before extending Business Central Expense Management tables or pages, inspect which events the Expense Agent subscribes to. List any OnBefore or OnAfter posting events in the expense codeunits, identify fields the agent reads for duplicate detection, and explain which approval workflow states the agent can modify. Do not edit files yet.'
      },
      {
        heading: 'Safe extension patterns for Expense Management',
        body:
          'Follow the same AL extension safety rules that apply to any posting module: use event subscribers instead of modifying base objects, avoid hardcoded dimensions or approval codes, and test with both manual and agent-initiated expense flows in your sandbox.',
        bullets: [
          'Use event subscribers to add logic to expense posting, not base codeunit changes.',
          'Test extensions with both manually submitted and agent-submitted expense reports.',
          'Avoid hardcoded company, dimension, or approval values in expense extensions.',
          'Review DataClassification on any new fields added to expense or employee tables.'
        ]
      }
    ],
    takeaways: [
      'The Business Central Expense Agent is in public preview as of 2026 Wave 1.',
      'It covers receipt extraction, duplicate detection, approval routing, and reimbursement posting.',
      'Significant new capabilities are scheduled for July 2026.',
      'AL developers extending Expense Management should map the agent event flow before writing code.'
    ]
  },
  {
    title: 'Migrating Business Central Integrations Away from API v1.0',
    slug: '/blog/migrate-business-central-api-v1',
    read: '11 min read',
    category: 'Design and Prompt Agent',
    description:
      'API v1.0 was removed in Business Central 2026 Wave 1. Use AI agents to audit your integrations, map replacements in API v2.0, and plan a safe migration.',
    intro:
      'Microsoft removed Business Central API v1.0 in 2026 release wave 1. Integrations that still call v1.0 endpoints will fail. The affected endpoints cover standard entities such as customers, vendors, items, sales orders, purchase orders, and journal entries. If your team has external systems, Power Automate flows, or custom connectors that use the v1.0 base path, a migration to v2.0 or a custom API page is required now.',
    sections: [
      {
        heading: 'What changed between API v1.0 and v2.0',
        body:
          'API v2.0 uses the same OData v4 structure but reorganizes several entity and field names for consistency. Some entities from v1.0 have direct v2.0 equivalents, others were merged, renamed, or require a custom API page for the same coverage. The migration is not a drop-in URL replacement — each endpoint must be reviewed individually.',
        bullets: [
          'Base URL change: /api/v1.0/ must be updated to /api/v2.0/ or a versioned custom endpoint.',
          'Entity names and field names may differ between versions.',
          'Some v1.0 entities have no direct v2.0 equivalent and need custom AL API pages.',
          'v2.0 returns different field structures for financial line entities.'
        ]
      },
      {
        heading: 'Step 1: Audit your existing v1.0 calls with an AI agent',
        body:
          'Before writing any replacement code, use an AI design agent to inventory every place in your codebase or integration platform that references the v1.0 API path. This gives you a complete list of endpoints and expected response fields to map.',
        code:
          'Act as a Business Central integration consultant. I have an integration that calls Business Central API v1.0. List every standard entity endpoint in v1.0 that has a known v2.0 equivalent. For each entity, note the v2.0 entity name, any field name changes, and whether the entity exists as-is or requires a custom API page. Output as a reference table.'
      },
      {
        heading: 'Step 2: Map each endpoint to a v2.0 replacement',
        body:
          'For each v1.0 endpoint your integration uses, identify the v2.0 equivalent or plan a custom API page. Custom API pages in AL follow a specific structure and can expose any Business Central table. If your integration uses a non-standard entity or a v1.0 field that does not exist in v2.0, a custom API page is the safest path.',
        code:
          'My integration calls the Business Central API v1.0 salesOrders endpoint. Compare the v1.0 and v2.0 salesOrders entity field lists, identify fields removed or renamed in v2.0, and draft a migration checklist. If any needed field is missing from v2.0, propose a custom API page in AL that exposes those fields safely.'
      },
      {
        heading: 'Step 3: Test the migration in a sandbox',
        body:
          'After updating endpoint URLs and field mappings, publish any new custom API pages to a Business Central sandbox and test the full integration flow. Pay particular attention to filter syntax, expand clauses, and authentication token scopes, which may differ between the versions.',
        bullets: [
          'Test OData filter expressions — v2.0 may reject some v1.0 filter syntax.',
          'Verify expand clauses for related entities such as salesOrderLines on salesOrders.',
          'Re-test OAuth 2.0 scopes — some v2.0 endpoints require updated API scope declarations.',
          'Check pagination behavior, as default page size may differ between versions.'
        ]
      }
    ],
    takeaways: [
      'API v1.0 was removed in Business Central 2026 Wave 1 — all v1.0 calls will fail.',
      'Audit every v1.0 endpoint reference before writing replacement code.',
      'Many entities have direct v2.0 equivalents; some require custom AL API pages.',
      'Test filter syntax, expand clauses, and OAuth scopes in a sandbox before going live.'
    ]
  },
  {
    title: 'Planning for Business Central SOAP Web Services Removal',
    slug: '/blog/business-central-soap-removal-planning',
    read: '8 min read',
    category: 'Codebase Navigation Agent',
    description:
      'SOAP web services for Microsoft UI pages are scheduled for removal in Business Central 2026 Wave 2. Use codebase agents to audit, plan, and replace affected integrations.',
    intro:
      'Microsoft has announced that SOAP web services for Business Central UI pages will be removed in 2026 release wave 2. If your team has integrations, middleware, or legacy connectors that call Business Central through SOAP, the planning window is now. Codebase navigation agents are well suited for this audit because SOAP references can be scattered across middleware projects, mapping configurations, and legacy AL code.',
    sections: [
      {
        heading: 'What is being removed and when',
        body:
          'The removal applies to SOAP web services built on Microsoft UI pages in Business Central. This covers standard page-based SOAP endpoints and any custom SOAP web services published through the Business Central service tier. The scheduled removal is 2026 release wave 2. OData v4 web services and API pages are not affected.',
        bullets: [
          'SOAP endpoints for Microsoft UI pages: removed in 2026 Wave 2.',
          'Custom AL SOAP web services published on pages: also removed in Wave 2.',
          'OData v4 web services and custom API pages: not affected by this removal.',
          'Data-defined permission sets: also scheduled for removal in 2026 Wave 2.'
        ]
      },
      {
        heading: 'Step 1: Use a codebase agent to find all SOAP references',
        body:
          'Before planning replacements, get a full picture of where SOAP is used. A codebase navigation agent can search across your AL projects, middleware code, and configuration files for SOAP endpoint patterns. This is a read-only inspection task — instruct the agent not to edit files until the audit is complete.',
        code:
          'Search this codebase for all references to Business Central SOAP web services. Find SOAP endpoint URLs, WSDL imports, service references, and any AL page objects published as SOAP services. List each reference with the file path and line number. Do not edit any files.'
      },
      {
        heading: 'Step 2: Map each SOAP endpoint to an OData or API replacement',
        body:
          'For each SOAP endpoint found, decide whether the replacement is a standard OData endpoint, an existing API v2.0 page, or a new custom API page in AL. SOAP endpoints often expose full page actions including posting functions. Some of these actions have no direct OData equivalent and will require a custom AL API page with explicit action procedures.',
        bullets: [
          'Read-only SOAP calls: usually replaceable with OData v4 or API v2.0 queries.',
          'Posting or action SOAP calls: may need a custom AL API page with action procedures.',
          'WSDL-generated proxies: require regeneration or full replacement with OData client code.',
          'Middleware SOAP clients: assess whether the middleware supports OData or needs updating.'
        ]
      },
      {
        heading: 'Step 3: Plan the replacement timeline',
        body:
          'With an audit list and replacement map in hand, prioritize by integration risk. Posting integrations and financial imports carry the highest risk. Document each replacement, test in a sandbox, and coordinate the go-live before the Wave 2 cutover.',
        code:
          'Based on this list of SOAP endpoints, create a migration plan. Group by risk level: posting or financial, read-only query, and configuration. For each group, suggest the safest OData or API v2.0 replacement approach and list sandbox test cases. Flag any endpoint that has no standard replacement and needs a custom AL API page.'
      }
    ],
    takeaways: [
      'SOAP web services for Business Central UI pages are removed in 2026 Wave 2.',
      'Use a codebase agent to audit all SOAP references before planning replacements.',
      'Most read-only SOAP calls can move to OData v4 or API v2.0.',
      'Posting and action SOAP calls may need new custom AL API pages.'
    ]
  }
];

export const snippets = [
  {
    title: 'Create Extension with Codex',
    category: 'Autonomous Coding Agent',
    desc: 'How Codex helps AL development and the skills you still need.',
    slug: '/blog/create-extension-with-codex'
  },
  {
    title: 'MCP Server for AL',
    category: 'Custom ERP Agent',
    desc: 'Connect AI agents directly to BC compiler diagnostics via MCP in update 28.1.',
    slug: '/blog/bc-mcp-server-al-troubleshooting'
  },
  {
    title: 'API v1.0 Migration',
    category: 'Design and Prompt Agent',
    desc: 'API v1.0 removed in 2026 Wave 1 — use AI agents to plan and execute the move to v2.0.',
    slug: '/blog/migrate-business-central-api-v1'
  }
];

export const codexBenefits = [
  {
    title: 'Repository-aware AL changes',
    text:
      'Codex can inspect app.json, object id ranges, naming patterns, and existing AL files before creating table extensions, page extensions, codeunits, or permission updates.'
  },
  {
    title: 'Build and error repair loop',
    text:
      'For Business Central work, Codex can run the project checks you expose, read AL compiler errors, and make targeted fixes instead of guessing from a single prompt.'
  },
  {
    title: 'Review for extension safety',
    text:
      'Use Codex to check generated AL for object ids, captions, ApplicationArea, DataClassification, permissions, upgrade risk, and missing sandbox tests.'
  },
  {
    title: 'Documentation and handover',
    text:
      'After coding, Codex can draft release notes, setup steps, UAT scripts, and consultant-friendly explanations of what changed in the Business Central extension.'
  }
];

export const codexModelComparison = [
  {
    model: 'GPT-5.3-Codex',
    bestFor: 'Complex agentic builds',
    businessCentralUse:
      'Use for multi-file AL features, codebase inspection, long-running refactors, and tasks that need terminal/tool use plus careful reasoning.'
  },
  {
    model: 'GPT-5.2-Codex',
    bestFor: 'Large repository work',
    businessCentralUse:
      'Use for substantial extension changes, migrations, Windows-based AL projects, pull request repair, and longer sessions with context compaction.'
  },
  {
    model: 'GPT-5-Codex',
    bestFor: 'Everyday coding agent work',
    businessCentralUse:
      'Use for normal AL object creation, event subscriber drafts, page changes, code review, and iterative fixes when the task is clear.'
  },
  {
    model: 'Lower reasoning effort',
    bestFor: 'Fast, low-risk edits',
    businessCentralUse:
      'Use for captions, comments, documentation, simple prompts, and small file edits where speed matters more than deep planning.'
  },
  {
    model: 'Higher reasoning effort',
    bestFor: 'Risky ERP changes',
    businessCentralUse:
      'Use for posting-related logic, permissions, upgrade-sensitive changes, integrations, and review tasks where mistakes can affect finance or operations.'
  }
];

export const categories = [
  {
    name: 'Autonomous Coding Agent',
    description: 'Agents that inspect a repository, edit AL files, run checks, and explain the change.',
    count: 2
  },
  {
    name: 'IDE Coding Assistant',
    description: 'Inline assistants for Visual Studio Code completions, small AL refactors, and chat help.',
    count: 1
  },
  {
    name: 'Design and Prompt Agent',
    description: 'Agents that turn Business Central requests into requirements, prompts, risks, and tests.',
    count: 2
  },
  {
    name: 'Codebase Navigation Agent',
    description: 'AI-first editors that map AL objects, dependencies, and multi-file feature changes.',
    count: 2
  },
  {
    name: 'Review and Documentation Agent',
    description: 'Agents that check AL risk, summarize pull requests, and draft Business Central documentation.',
    count: 1
  },
  {
    name: 'Custom ERP Agent',
    description: 'Team-specific agents that follow your AL standards, id ranges, naming rules, and release checks.',
    count: 2
  }
];

export const releaseChangelog = {
  eyebrow: 'Latest release watch',
  title: 'Business Central 2026 Wave 1 Changelog',
  description:
    'A Microsoft-sourced snapshot for update 28.1 and the 2026 release wave 1 plan. Use it to see what is newly available, what is planned, what is removed, and what is scheduled for removal.',
  verifiedDate: 'Verified June 1, 2026',
  currentRelease: 'Update 28.1 for Microsoft Dynamics 365 Business Central 2026 release wave 1',
  groups: [
    {
      label: 'Newly added',
      tone: 'cyan',
      items: [
        'Update 28.1 is the current Microsoft Learn release note page for Business Central 2026 release wave 1, last updated May 8, 2026.',
        'Expense Agent is introduced in preview, with expense extraction, duplicate detection, report generation, approval workflow support, and reimbursement posting through the Expense Management module.',
        'Enable Troubleshooting MCP Server for AL is listed as generally available in update 28.1, allowing MCP-compatible AI agents to connect to AL compiler diagnostics directly.',
        'Audit user and group permissions across apps is listed as generally available in update 28.1.',
        'Control the lifecycle of report layouts, enhanced reports for deferrals and trial balances, and new APIs for approval-workflow and permission analysis are listed in update 28.1 feature changes.',
        'Use AI resources for Copilot extensions is listed as generally available, enabling partners to use the Business Central AI platform in their own Copilot extensions.'
      ]
    },
    {
      label: 'Pending to be added',
      tone: 'blue',
      items: [
        'Expense Agent approval process enhancements are listed for public preview in July 2026.',
        'Capture expenses with Expense Agent on the mobile app is listed for public preview in July 2026.',
        'Manage travel requisitions with Expense Agent is listed for public preview in July 2026.',
        'Use Expense Agent in German, Danish, French, and Spanish is listed for public preview in July 2026.',
        'Several governance, localization, financial, reporting, and e-document features remain scheduled through June, July, September, and October 2026. Microsoft notes that planned timelines may change.'
      ]
    },
    {
      label: 'Removed',
      tone: 'rose',
      items: [
        'API v1.0 is removed in 2026 release wave 1. All integrations calling /api/v1.0/ endpoints must migrate to v2.0 or custom API pages immediately.',
        'Excel reports embedded on role centers are removed in 2026 release wave 1.',
        'Legacy Power BI apps are removed in 2026 release wave 1.',
        'Intelligent Cloud Insights is removed in 2026 release wave 1.',
        'Legacy reports scheduled for deprecation are removed in 2026 release wave 1.'
      ]
    },
    {
      label: 'Pending removed',
      tone: 'amber',
      items: [
        'SOAP web services for Microsoft UI pages are scheduled for removal in 2026 release wave 2. Begin auditing and replacing SOAP integrations now.',
        'Data-defined permission sets are scheduled for removal in 2026 release wave 2.',
        'OData web services for Microsoft UI pages are scheduled for removal in 2027 release wave 1.',
        'AMC Banking Fundamentals extension, including AMC Banking 365 Fundamentals, is scheduled for removal in 2027 release wave 1.',
        'Support for Peppol BIS 2.0 and 2.1 formats is scheduled for removal in 2027 release wave 1.'
      ]
    }
  ],
  sources: [
    {
      label: 'Update 28.1 release notes',
      href: 'https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/whatsnew/whatsnew-update-28-1'
    },
    {
      label: '2026 wave 1 planned features',
      href: 'https://learn.microsoft.com/en-us/dynamics365/release-plan/2026wave1/smb/dynamics365-business-central/planned-features'
    },
    {
      label: 'Deprecated features in the application',
      href: 'https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/upgrade/deprecated-features-w1'
    },
    {
      label: 'Deprecated features in the platform',
      href: 'https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/upgrade/deprecated-features-platform'
    }
  ]
};

export const faqs = [
  {
    question: 'Which AI coding agent is best for Business Central development?',
    answer:
      'Use Codex or a similar repository-aware agent for multi-file extension work, GitHub Copilot for inline Visual Studio Code help, ChatGPT for solution design and prompts, and a custom agent when your team has repeatable AL standards.'
  },
  {
    question: 'Can an AI agent create a Business Central extension alone?',
    answer:
      'It can draft much of the code, but a developer still needs to validate AL design, business process fit, permissions, upgrade safety, build output, and sandbox behavior.'
  },
  {
    question: 'What skills should a Business Central developer learn before using coding agents?',
    answer:
      'Learn AL object types, app.json, id ranges, page and table extensions, event subscribers, permissions, source control, and sandbox testing. These skills help you judge whether AI-generated code is safe.'
  },
  {
    question: 'Is it safe to let an AI agent modify Business Central base application objects?',
    answer:
      'No. AI agents should only create or modify extension objects, never the base application. Modifying base tables or pages directly breaks upgrade paths and is unsupported by Microsoft. Always instruct your agent to stay inside extension-safe AL patterns using table extensions, page extensions, and event subscribers.'
  },
  {
    question: 'What is the difference between GitHub Copilot and Codex for Business Central AL work?',
    answer:
      'GitHub Copilot is an inline VS Code assistant that suggests code as you type, working with local file context. Codex is a repository-aware autonomous agent that can inspect your whole AL project, run build commands, read compiler errors, and make multi-file changes. Use Copilot for fast inline help and Codex for larger, planned development tasks that need project-wide context.'
  },
  {
    question: 'How do I test AI-generated AL code safely before going to production?',
    answer:
      'Publish the extension to a sandbox environment first. Test with a real user role, not just the SUPER role. Verify that new fields appear in the expected page locations, permissions work for normal users, and posting processes still complete correctly. Only promote to production after the extension passes a full review checklist covering object ids, captions, DataClassification, and upgrade safety.'
  },
  {
    question: 'Do AI coding agents understand Business Central posting routines and document flows?',
    answer:
      'AI agents can draft code related to posting routines, but they do not automatically know your specific Business Central setup, localization rules, or approval workflows. Always review AI-generated code that touches posting codeunits, approval entries, ledger tables, or financial dimensions before publishing. Use a review agent to produce a risk checklist before merging.'
  },
  {
    question: 'Can I use AI agents to help migrate from older Business Central versions or NAV?',
    answer:
      'Yes, AI agents can help analyze deprecated objects, suggest replacements for removed APIs such as API v1.0 removed in 2026 Wave 1, and draft replacement extension objects. Use a review agent to audit deprecated features in your codebase against the current removal list, then use a coding agent to propose the updated AL objects.'
  },
  {
    question: 'What is the Business Central MCP Server for AL and how does it help developers?',
    answer:
      'The MCP Server for AL, generally available in Business Central 2026 Wave 1 update 28.1, exposes AL compiler diagnostics as a structured data source that MCP-compatible AI agents can query. Instead of copying error messages manually, the agent reads diagnostics directly and proposes targeted fixes. It works with Claude, GitHub Copilot in agent mode, and other MCP-compatible clients.'
  },
  {
    question: 'Is Business Central API v1.0 still available?',
    answer:
      'No. API v1.0 was removed in Business Central 2026 release wave 1. Any integration calling endpoints under /api/v1.0/ will fail. Migrate to API v2.0 or create custom API pages in AL. Use an AI design agent to audit your current v1.0 calls and map each one to a v2.0 equivalent before updating your integration code.'
  },
  {
    question: 'When will SOAP web services be removed from Business Central?',
    answer:
      'SOAP web services for Microsoft UI pages are scheduled for removal in Business Central 2026 release wave 2. OData v4 and API pages are not affected. Start auditing SOAP-dependent integrations now using a codebase navigation agent to find all SOAP endpoint references, then plan replacements using OData v4 or custom AL API pages.'
  }
];

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(currentSlug, category, limit = 3) {
  return articles
    .filter((article) => article.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === category && b.category !== category) return -1;
      if (a.category !== category && b.category === category) return 1;
      return 0;
    })
    .slice(0, limit);
}
