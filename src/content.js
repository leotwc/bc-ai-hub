export const articles = [
  {
    title: 'How to Handle Empty Expiration Date in Business Central',
    slug: '/blog/patch-empty-expiration-date',
    read: '6 min read',
    category: 'Inventory',
    description:
      'Learn how to automatically patch empty expiration dates using AL development and warehouse validation logic.',
    intro:
      'Empty expiration dates usually appear when item tracking setup, warehouse documents, and user entry rules do not line up. The safest fix is to validate early, patch only when the business rule is clear, and leave an audit-friendly path for exceptions.',
    sections: [
      {
        heading: 'Where the gap usually starts',
        body:
          'Start by checking the item tracking code, lot information, and warehouse posting flow. If the item requires expiry control, an empty date should be treated as incomplete data before it reaches posting. For items that do not require expiry, the rule should skip cleanly instead of forcing a fake date.'
      },
      {
        heading: 'A practical AL pattern',
        body:
          'Subscribe to the posting or validation event closest to the document you control. Read the item tracking setup, confirm the lot number exists, and only calculate a default date from shelf life when the item policy explicitly allows it.'
      },
      {
        heading: 'User-facing behavior',
        body:
          'Use clear error messages when the date is required and cannot be inferred. Mention the item number, lot number, and document line so warehouse users can fix the source data without guessing.'
      }
    ],
    takeaways: [
      'Do not silently patch expiry for every item.',
      'Use item tracking setup as the source of truth.',
      'Prefer validation before posting rather than cleanup after posting.'
    ]
  },
  {
    title: 'Business Central Item Tracking Best Practices',
    slug: '/blog/item-tracking-best-practices',
    read: '8 min read',
    category: 'Warehouse',
    description:
      'Best practices for lot tracking, serial numbers, warehouse posting, and inventory management.',
    intro:
      'Item tracking works best when setup, warehouse process, and reporting requirements are designed together. A clean design reduces posting errors and gives operations reliable traceability.',
    sections: [
      {
        heading: 'Choose the right tracking level',
        body:
          'Use lot tracking for batch-managed goods and serial tracking for individually identifiable units. Avoid enabling every tracking option by default, because excessive tracking slows receiving, picking, and adjustment workflows.'
      },
      {
        heading: 'Keep warehouse steps consistent',
        body:
          'Receiving, put-away, picking, and shipping should collect tracking data at predictable points. Users should not discover missing tracking numbers only after they try to post.'
      },
      {
        heading: 'Design for reporting',
        body:
          'Traceability reports depend on clean lot and serial data. Standardize lot number formats, expiry rules, and blocking rules so recalls and audits can be handled quickly.'
      }
    ],
    takeaways: [
      'Tracking setup should match the physical process.',
      'Collect tracking data before posting pressure starts.',
      'Use consistent lot and serial formats for auditability.'
    ]
  },
  {
    title: 'AL Code to Validate Lot Expiry',
    slug: '/blog/validate-lot-expiry',
    read: '5 min read',
    category: 'AL Development',
    description:
      'Implement lot expiry validation logic in Business Central using AL language.',
    intro:
      'Lot expiry validation protects stock accuracy and customer commitments. The goal is to stop expired inventory at the right boundary without blocking legitimate returns, quarantine movements, or corrections.',
    sections: [
      {
        heading: 'Validate the business scenario',
        body:
          'Outbound sales, consumption, and transfer shipments usually need stricter expiry checks than inbound receiving. Build the rule around document type and movement direction so internal corrections remain possible.'
      },
      {
        heading: 'Use event subscribers',
        body:
          'Prefer event subscribers around reservation, item journal, warehouse journal, or posting codeunits instead of modifying base objects. Keep the subscriber small and delegate reusable date checks into a local procedure.'
      },
      {
        heading: 'Make errors actionable',
        body:
          'Include item, lot, expiry date, and document context in the error. Users should know whether they need a different lot, a date correction, or a manager-approved exception.'
      }
    ],
    takeaways: [
      'Check movement direction before blocking.',
      'Keep AL subscribers focused and testable.',
      'Actionable errors reduce warehouse support tickets.'
    ]
  },
  {
    title: 'Business Central API Integration Guide',
    slug: '/blog/business-central-api-guide',
    read: '9 min read',
    category: 'Integration',
    description:
      'Step-by-step guide to integrating external APIs using HttpClient and JSON in AL.',
    intro:
      'Good integrations in Business Central are predictable, observable, and respectful of platform limits. The AL code is only one piece; authentication, retries, logging, and data ownership matter just as much.',
    sections: [
      {
        heading: 'Start with the contract',
        body:
          'Document the endpoint, payload, authentication method, timeout expectations, and ownership of each field. This prevents AL code from becoming the only place where integration behavior is explained.'
      },
      {
        heading: 'Handle HTTP responses deliberately',
        body:
          'Check the status code before reading the body. Treat validation errors, authentication failures, and service outages differently so users and admins receive the right next action.'
      },
      {
        heading: 'Log enough to support operations',
        body:
          'Store request identifiers, external references, response status, and sanitized error details. Avoid logging secrets or full personal data payloads.'
      }
    ],
    takeaways: [
      'Define the API contract before writing AL.',
      'Separate auth, request building, and response handling.',
      'Never log tokens or sensitive payloads.'
    ]
  },
  {
    title: 'Send Email from Business Central using AL',
    slug: '/blog/send-email-al',
    read: '4 min read',
    category: 'Automation',
    description:
      'Use AL code to automate email sending with custom templates and attachments.',
    intro:
      'Email automation is useful for approvals, customer notices, and operational alerts. In Business Central, the best implementation keeps message composition separate from the event that triggers it.',
    sections: [
      {
        heading: 'Use the platform email model',
        body:
          'Use the standard email account and message APIs where possible. This keeps delivery settings, sender identity, and user administration aligned with Business Central configuration.'
      },
      {
        heading: 'Template the content',
        body:
          'Store subject and body patterns separately from the trigger logic. Replace values such as document number, customer name, and due date through a small rendering procedure.'
      },
      {
        heading: 'Protect deliverability',
        body:
          'Avoid sending inside long posting transactions when possible. Queue messages, track failures, and give administrators a way to resend after configuration issues are fixed.'
      }
    ],
    takeaways: [
      'Separate triggers from message composition.',
      'Use configured email accounts instead of hard-coded senders.',
      'Track failed sends for operational recovery.'
    ]
  },
  {
    title: 'Business Central Posting Date Validation',
    slug: '/blog/posting-date-validation',
    read: '7 min read',
    category: 'Finance',
    description:
      'Prevent invalid posting dates and improve accounting control with AL validation.',
    intro:
      'Posting date validation protects period close, tax reporting, and audit discipline. Custom logic should complement the standard allowed posting date settings instead of replacing them.',
    sections: [
      {
        heading: 'Respect standard setup',
        body:
          'Check user setup, general ledger setup, and document-specific rules before applying custom restrictions. Standard Business Central controls should remain the first line of defense.'
      },
      {
        heading: 'Apply targeted exceptions',
        body:
          'Some users may need broader permissions for corrections or period-end activities. Model those exceptions explicitly, preferably with roles or setup records rather than user-name checks in code.'
      },
      {
        heading: 'Explain the blocked period',
        body:
          'When validation fails, show the allowed date range and the setup that controls it. This makes the message useful to finance users and support teams.'
      }
    ],
    takeaways: [
      'Build on standard posting date controls.',
      'Model exceptions through setup, not hard-coded users.',
      'Error messages should include the allowed date range.'
    ]
  },
  {
    title: 'How to Build AI Automation in Business Central',
    slug: '/blog/ai-automation-business-central',
    read: '10 min read',
    category: 'AI',
    description:
      'Discover practical ways to integrate AI workflows into ERP business processes.',
    intro:
      'AI automation is most valuable when it removes repetitive interpretation work while leaving Business Central as the system of record. Start with low-risk workflows and add human review where decisions affect money, inventory, or compliance.',
    sections: [
      {
        heading: 'Pick workflows with clear inputs',
        body:
          'Good candidates include email classification, purchase invoice assistance, exception summaries, item descriptions, and support triage. Avoid vague workflows where the expected answer cannot be checked.'
      },
      {
        heading: 'Keep ERP rules authoritative',
        body:
          'Let AI suggest, summarize, or draft. Let Business Central validation, approvals, and posting routines make the final system-of-record changes.'
      },
      {
        heading: 'Measure the outcome',
        body:
          'Track time saved, error rate, review rate, and user adoption. These measurements matter more than a demo that looks impressive but does not survive daily operations.'
      }
    ],
    takeaways: [
      'Start with assistive workflows before autonomous posting.',
      'Keep Business Central validation in charge.',
      'Measure review quality and time saved.'
    ]
  },
  {
    title: 'Top ChatGPT Prompts for AL Developers',
    slug: '/blog/chatgpt-prompts-al',
    read: '6 min read',
    category: 'AI Prompt',
    description:
      'Boost AL development productivity using reusable AI prompts for Business Central.',
    intro:
      'Strong prompts help AL developers move faster when they include Business Central context, object boundaries, expected events, and acceptance criteria. The best results come from asking for a reviewable draft, not blindly accepting generated code.',
    sections: [
      {
        heading: 'Give the model the object context',
        body:
          'Include table, page, codeunit, event publisher, and target version details. Mention whether the solution should be an extension-only customization and whether new setup is allowed.'
      },
      {
        heading: 'Ask for testable output',
        body:
          'Request assumptions, edge cases, and a test checklist along with the AL code. This makes the response easier to validate before it enters the repository.'
      },
      {
        heading: 'Use AI for review too',
        body:
          'After drafting, ask for risks such as missing permissions, transaction timing, localization, upgrade compatibility, and standard feature overlap.'
      }
    ],
    takeaways: [
      'Prompt with object names and event boundaries.',
      'Ask for assumptions and test cases.',
      'Review generated AL before using it.'
    ]
  },
  {
    title: 'Create Table Extensions in AL',
    slug: '/blog/table-extension-al',
    read: '5 min read',
    category: 'AL Development',
    description:
      'Learn how to extend Business Central tables with custom fields and validations.',
    intro:
      'Table extensions are the foundation of many Business Central customizations. A good table extension adds only the fields the process needs and keeps validation close to the data it protects.',
    sections: [
      {
        heading: 'Name fields for long-term clarity',
        body:
          'Use names that explain the business meaning, not only the source request. Keep captions user-friendly and avoid abbreviations that will confuse support teams later.'
      },
      {
        heading: 'Choose field classes carefully',
        body:
          'Normal fields store operational data. FlowFields calculate from related records. Pick the field class intentionally because changing it later can affect data and page behavior.'
      },
      {
        heading: 'Validate at the right layer',
        body:
          'Use table validation for rules that must apply everywhere. Use page behavior for guidance, layout, or workflow-specific convenience.'
      }
    ],
    takeaways: [
      'Add the minimum fields needed for the process.',
      'Use table validation for universal data rules.',
      'Keep captions and tooltips meaningful.'
    ]
  },
  {
    title: 'How to Consume REST API in AL',
    slug: '/blog/rest-api-al',
    read: '9 min read',
    category: 'API',
    description:
      'Use HttpClient and JsonObject in AL to consume external REST APIs securely.',
    intro:
      'Consuming REST APIs from AL requires careful request construction, authentication handling, response parsing, and error recovery. A small integration wrapper makes the code easier to reuse and troubleshoot.',
    sections: [
      {
        heading: 'Build requests consistently',
        body:
          'Centralize base URL, headers, timeouts, and authentication. This prevents every caller from creating its own slightly different version of the same request.'
      },
      {
        heading: 'Parse JSON defensively',
        body:
          'Check whether expected tokens exist before reading them. External APIs change, and defensive parsing gives you better errors than a generic runtime failure.'
      },
      {
        heading: 'Plan for retries and failures',
        body:
          'Differentiate between temporary failures, validation errors, and unauthorized requests. Retry only when it is safe and when duplicate requests will not create duplicate external records.'
      }
    ],
    takeaways: [
      'Centralize request configuration.',
      'Parse JSON with explicit checks.',
      'Retry only idempotent or safely tracked operations.'
    ]
  },
  {
    title: 'Business Central Warehouse Automation',
    slug: '/blog/warehouse-automation',
    read: '8 min read',
    category: 'Warehouse',
    description:
      'Automate warehouse posting, inventory movement, and scanning processes.',
    intro:
      'Warehouse automation should reduce repeated entry without hiding operational reality. The best automations support scanning, validation, and exception handling while keeping inventory movements traceable.',
    sections: [
      {
        heading: 'Automate repeatable steps',
        body:
          'Good candidates include default bin selection, scan validation, movement worksheet creation, and exception notifications. Avoid automating decisions that still require physical confirmation.'
      },
      {
        heading: 'Design around scanning',
        body:
          'Barcode flows need fast feedback. Validate item, lot, serial, bin, and quantity immediately so users can correct issues while they are still at the warehouse location.'
      },
      {
        heading: 'Keep exceptions visible',
        body:
          'Automation should create clear exception queues instead of burying failures in logs. Supervisors need to see blocked movements, short picks, and expiry issues quickly.'
      }
    ],
    takeaways: [
      'Automate repeated entry, not uncertain decisions.',
      'Give scan users immediate validation feedback.',
      'Surface exceptions in operational queues.'
    ]
  },
  {
    title: 'AI Copilot Ideas for Business Central',
    slug: '/blog/copilot-ideas',
    read: '11 min read',
    category: 'AI',
    description:
      'Explore real-world Copilot use cases and AI assistants for ERP operations.',
    intro:
      'Copilot-style experiences can help Business Central users understand data, draft actions, and navigate complex processes. The most useful ideas are specific to a role and grounded in trusted ERP records.',
    sections: [
      {
        heading: 'Finance assistant ideas',
        body:
          'Summarize overdue customers, explain unusual account movements, draft collection notes, and prepare month-end exception lists. Keep final posting and approvals inside standard controls.'
      },
      {
        heading: 'Warehouse assistant ideas',
        body:
          'Guide users through short picks, lot substitutions, expiry checks, and transfer exceptions. A good assistant should reference the exact document and item context.'
      },
      {
        heading: 'Developer assistant ideas',
        body:
          'Generate test outlines, explain AL event choices, summarize telemetry, and draft upgrade notes. Developers still need to review for performance, permissions, and upgrade compatibility.'
      }
    ],
    takeaways: [
      'Design assistants around a role and workflow.',
      'Use trusted Business Central records as context.',
      'Keep approval and posting controls explicit.'
    ]
  }
];

export const snippets = [
  {
    title: 'Patch Empty Expiration Date',
    category: 'Inventory',
    desc: 'Automatically populate expiration date during warehouse posting.',
    slug: '/blog/patch-empty-expiration-date'
  },
  {
    title: 'Validate Posting Date',
    category: 'Finance',
    desc: 'Prevent users from posting outside allowed posting ranges.',
    slug: '/blog/posting-date-validation'
  },
  {
    title: 'JSON API Authentication',
    category: 'Integration',
    desc: 'Authenticate external REST APIs using AL HttpClient.',
    slug: '/blog/business-central-api-guide'
  }
];

export const keywords = [
  'Business Central AI Automation',
  'AL Development Tutorial',
  'Dynamics 365 API Integration',
  'Business Central Copilot',
  'AI for ERP Systems'
];

export const categories = [
  {
    name: 'AL Development',
    description: 'Extension patterns, validation logic, table design, and developer productivity.',
    count: 3
  },
  {
    name: 'Warehouse',
    description: 'Item tracking, scanning, lot control, expiry checks, and warehouse automation.',
    count: 3
  },
  {
    name: 'AI',
    description: 'Copilot ideas, prompt workflows, and AI automation for ERP teams.',
    count: 3
  },
  {
    name: 'Integration',
    description: 'REST APIs, HttpClient, JSON handling, authentication, and operational logging.',
    count: 2
  }
];

export const resources = [
  'AL validation checklist for posting and warehouse flows',
  'Reusable prompt patterns for extension design and code review',
  'Integration readiness notes for API contracts and telemetry',
  'Business Central AI opportunity map for finance and operations'
];

export const faqs = [
  {
    question: 'Can AI safely update Business Central records?',
    answer:
      'AI should usually suggest, draft, classify, or summarize. Business Central validation, approvals, and posting routines should remain responsible for committed ERP changes.'
  },
  {
    question: 'Do these tutorials require modifying base objects?',
    answer:
      'No. The guidance focuses on extension-friendly AL patterns such as table extensions, page extensions, event subscribers, setup records, and reusable codeunits.'
  },
  {
    question: 'What should developers test first?',
    answer:
      'Test the business boundary: posting dates, item tracking requirements, empty values, API failures, permissions, and direct refresh on article routes after deployment.'
  }
];

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(currentSlug, category, limit = 3) {
  return articles
    .filter((article) => article.slug !== currentSlug && article.category === category)
    .slice(0, limit);
}
