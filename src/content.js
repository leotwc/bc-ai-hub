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
    title: 'Copilot in VS Code',
    category: 'IDE Coding Assistant',
    desc: 'Use inline AI help for Business Central AL objects and refactors.',
    slug: '/blog/github-copilot-business-central-al'
  },
  {
    title: 'Custom BC Coding Agent',
    category: 'Custom ERP Agent',
    desc: 'Define project rules for repeatable AL agent workflows.',
    slug: '/blog/custom-business-central-coding-agent'
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
    count: 1
  },
  {
    name: 'IDE Coding Assistant',
    description: 'Inline assistants for Visual Studio Code completions, small AL refactors, and chat help.',
    count: 1
  },
  {
    name: 'Design and Prompt Agent',
    description: 'Agents that turn Business Central requests into requirements, prompts, risks, and tests.',
    count: 1
  },
  {
    name: 'Codebase Navigation Agent',
    description: 'AI-first editors that map AL objects, dependencies, and multi-file feature changes.',
    count: 1
  },
  {
    name: 'Review and Documentation Agent',
    description: 'Agents that check AL risk, summarize pull requests, and draft Business Central documentation.',
    count: 1
  },
  {
    name: 'Custom ERP Agent',
    description: 'Team-specific agents that follow your AL standards, id ranges, naming rules, and release checks.',
    count: 1
  }
];

export const releaseChangelog = {
  eyebrow: 'Latest release watch',
  title: 'Business Central 2026 Wave 1 Changelog',
  description:
    'A Microsoft-sourced snapshot for update 28.1 and the 2026 release wave 1 plan. Use it to see what is newly available, what is planned, what is removed, and what is scheduled for removal.',
  verifiedDate: 'Verified May 29, 2026',
  currentRelease: 'Update 28.1 for Microsoft Dynamics 365 Business Central 2026 release wave 1',
  groups: [
    {
      label: 'Newly added',
      tone: 'cyan',
      items: [
        'Update 28.1 is the current Microsoft Learn release note page for Business Central 2026 release wave 1, last updated May 8, 2026.',
        'Expense Agent is introduced in preview, with expense extraction, duplicate detection, report generation, approval workflow support, and reimbursement posting through the Expense Management module.',
        'Enable Troubleshooting MCP Server for AL is listed as generally available in update 28.1.',
        'Audit user and group permissions across apps is listed as generally available in update 28.1.',
        'Control the lifecycle of report layouts, enhanced reports for deferrals and trial balances, and new APIs for approval-workflow and permission analysis are listed in update 28.1 feature changes.'
      ]
    },
    {
      label: 'Pending to be added',
      tone: 'blue',
      items: [
        'Expense Agent approval process is listed for public preview in July 2026.',
        'Capture expenses with Expense Agent on the mobile app is listed for public preview in July 2026.',
        'Manage travel requisitions with Expense Agent is listed for public preview in July 2026.',
        'Use Expense Agent in German, Danish, French, and Spanish is listed for public preview in July 2026.',
        'Use AI resources for Copilot extensions is listed for general availability in September 2026.',
        'Several governance, localization, financial, reporting, and e-document features remain scheduled through June, July, September, and October 2026. Microsoft notes that planned timelines may change.'
      ]
    },
    {
      label: 'Removed',
      tone: 'rose',
      items: [
        'Excel reports embedded on role centers are removed in 2026 release wave 1.',
        'API v1.0 is removed in 2026 release wave 1. Integrations should use supported newer API versions.',
        'Legacy Power BI apps are removed in 2026 release wave 1.',
        'Intelligent Cloud Insights is removed in 2026 release wave 1.',
        'Legacy reports scheduled for deprecation are removed in 2026 release wave 1.'
      ]
    },
    {
      label: 'Pending removed',
      tone: 'amber',
      items: [
        'SOAP web services for Microsoft UI pages are scheduled for removal in 2026 release wave 2.',
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
