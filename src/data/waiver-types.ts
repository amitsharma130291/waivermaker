export interface WaiverType {
  slug: string;
  title: string;
  emoji: string;
  activityType: string;
  metaDescription: string;
  intro: string[];
  clauses: string[];
  clauseDescriptions: string[];
  faqs: { q: string; a: string }[];
  whyCards: { icon: string; title: string; body: string }[];
}

export const waiverTypes: WaiverType[] = [
  {
    slug: 'gym-waiver',
    title: 'Gym & Fitness Waiver',
    emoji: '💪',
    activityType: 'Gym/Fitness',
    metaDescription: 'Generate a gym & fitness liability waiver for your business. Customised with your governing state, free to preview. Free to preview and download.',
    intro: [
      'A gym and fitness liability waiver protects your business from claims arising from injuries that occur during workouts, personal training sessions, or use of gym equipment. Whether you run a CrossFit box, a traditional gym, or a boutique fitness studio, a signed waiver can form part of your gym\'s broader risk-management and participant-consent process.',
      'Gyms and fitness centers face a unique set of liability risks: dropped weights, equipment malfunctions, overexertion injuries, and slip-and-fall incidents are all common. Your waiver should clearly disclose these risks and obtain the participant\'s informed consent before they step onto your floor.',
      'WaiverTemplate generates a gym waiver customised with your selected governing state, your specific activities, and the risks your business actually faces — in under two minutes.',
    ],
    clauses: [
      'Equipment safety and proper use acknowledgment',
      'Risk of muscle strain, joint injury, and overexertion',
      'Personal training and group class participation risks',
      'Slip-and-fall hazard acknowledgment',
      'Medical clearance and fitness-to-participate declaration',
      'Emergency medical authorization',
      'Assumption of risk for all gym activities',
      'Indemnification and hold-harmless agreement',
      'Photo/video release (optional)',
      'Governing-law clause (identifying your selected state)',
    ],
    clauseDescriptions: [
      'Documents that the member has been shown how to use equipment safely and accepts responsibility for proper use.',
      'Clearly discloses the risk of muscle strains, joint injuries, and overexertion inherent in physical training.',
      'Confirms the member understands the risks of joining led sessions and group classes.',
      'The member acknowledges wet floors, loose weights, and other common gym hazards.',
      'Member certifies they are physically fit to exercise; high-risk individuals are encouraged to seek physician clearance.',
      'Allows your staff to consent to emergency treatment if a member is incapacitated.',
      'The member voluntarily accepts the inherent risks of gym use and releases the facility from resulting claims.',
      'Member agrees to hold the facility harmless for losses arising from their own actions.',
      'Optional clause allowing the gym to photograph or film members for promotional use.',
      'Identifies the state whose law governs the agreement — set by your selection above.',
    ],
    faqs: [
      {
        q: 'Does a gym waiver protect against all injury claims?',
        a: 'A well-drafted waiver can limit liability for injuries arising from inherent risks of gym use — equipment failure from normal wear, falls, and overexertion. It does not protect against claims arising from the facility\'s negligence, such as improperly maintained equipment or unsafe premises. Consult a local attorney for advice specific to your state.',
      },
      {
        q: 'Do I need a new waiver when a member\'s membership renews?',
        a: 'Best practice is to have members re-sign at each renewal, particularly if your services, equipment, or policies have changed. Some gyms use annual waivers; others require a fresh signature at each visit. A local attorney can advise on what\'s appropriate in your state.',
      },
      {
        q: 'Can minors become gym members?',
        a: 'Rules vary by state and by the specific activities offered. A parent or guardian must sign for anyone under 18. Some activities (such as free-weight areas) may have minimum age requirements under state law or insurance policy terms.',
      },
      {
        q: 'Should personal training sessions use a separate waiver?',
        a: 'Many gyms use a combined gym membership waiver that covers all activities. If you offer personal training as a separate paid service, a specific personal training agreement alongside the gym waiver provides clearer documentation. See our Personal Trainer Waiver for a starting point.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. WaiverTemplate generates template documents to help you document participant consent. For advice specific to your gym, state, and circumstances, consult a licensed attorney.',
      },
    ],
    whyCards: [
      {
        icon: '🏋️',
        title: 'Injury Liability Protection',
        body: 'Gyms and fitness centers are high-risk environments. A signed waiver documents that every member was informed of the risks before they used your facility — providing a clear record if a claim arises.',
      },
      {
        icon: '📋',
        title: 'Informed Consent Record',
        body: 'A written waiver creates a durable record of each member\'s acknowledgement. Without it, any injury dispute becomes a \'they said, we said\' situation with no documentation to support your position.',
      },
      {
        icon: '🛡️',
        title: 'Part of Your Risk Management',
        body: 'A signed waiver can form part of your gym\'s broader risk-management and participant-consent process. Combined with clear rules, proper equipment maintenance, and trained staff, it demonstrates a professional approach to member safety.',
      },
    ],
  },
  {
    slug: 'tattoo-waiver',
    title: 'Tattoo Studio Waiver',
    emoji: '🎨',
    activityType: 'Tattoo Studio',
    metaDescription: 'Create a tattoo studio liability waiver in minutes. Covers informed consent, health disclosure, ink allergy risks, aftercare, and client acknowledgement. Free to preview and download.',
    intro: [
      'A tattoo studio waiver serves a dual purpose: it protects your business from liability and demonstrates your professionalism to clients. Every reputable tattoo studio requires clients to sign before any work begins.',
      'The risks in tattooing go beyond the needle — clients may have undisclosed health conditions like blood thinners, diabetes, or skin sensitivities that affect healing. Your waiver collects this information and documents that the client was fully informed before consenting to the procedure.',
      'WaiverTemplate generates a tattoo consent form and liability waiver specific to your state, covering everything from health disclosure to aftercare responsibility.',
    ],
    clauses: [
      'Informed consent for permanent body modification',
      'Health condition disclosure (blood thinners, diabetes, skin conditions)',
      'Allergic reaction risk acknowledgment',
      'Infection risk and aftercare responsibility',
      'Age verification (18+ requirement)',
      'Sobriety declaration (no alcohol or drugs)',
      'Right to refuse service clause',
      'Design approval and final artwork sign-off',
      'Photo release for portfolio use',
      'Governing law and jurisdiction clause',
    ],
    clauseDescriptions: [
      'Client confirms they understand the permanent nature of the tattoo and consent to the procedure voluntarily.',
      'Collects disclosure of conditions such as blood thinners, diabetes, and skin sensitivities that affect healing outcomes.',
      'Discloses risks including allergic reactions to ink pigments, infection, scarring, keloid formation, and ink fading or migration.',
      'Confirms that the studio has provided aftercare instructions and places healing responsibility on the client.',
      'Certifies the client is 18+ or has documented parental/guardian consent in accordance with state law.',
      'Client declares they are sober and have not consumed alcohol or drugs in advance of the appointment.',
      'Reserves the studio\'s right to decline service at its discretion, without requiring a reason.',
      'Client signs off on the final approved design before work begins, preventing later disputes about artwork.',
      'Optional clause allowing the studio to photograph finished tattoos for portfolio and social media use.',
      'Identifies the state whose law governs the agreement and any disputes arising from the service.',
    ],
    faqs: [
      {
        q: 'Is a verbal waiver enough for a tattoo studio?',
        a: 'A written, signed waiver creates a clear record of the client\'s acknowledgement and consent and avoids relying solely on a verbal agreement.',
      },
      {
        q: 'Do I need a new waiver for each client visit?',
        a: 'Best practice is to obtain a fresh signed waiver for each appointment, particularly if the service, artist, or body placement changes. Consult a local attorney if you are unsure about your local legal requirements.',
      },
      {
        q: 'Can minors sign a tattoo waiver?',
        a: 'Rules vary by state — some states prohibit tattooing minors regardless of parental consent. Check your state\'s specific statutes before tattooing anyone under 18.',
      },
      {
        q: 'How long should I keep signed tattoo waivers?',
        a: 'Retention requirements differ by state and by the nature of any potential claim. Many attorneys recommend a minimum of three years; your insurer or a local attorney can advise on the appropriate period for your location.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. WaiverTemplate generates template documents to help you document client consent. For jurisdiction-specific legal advice, consult a licensed attorney in your state.',
      },
    ],
    whyCards: [
      {
        icon: '⚡',
        title: 'Liability Protection',
        body: 'If a client develops an infection or allergic reaction after their tattoo, a signed waiver provides a clear record that they were informed of these risks beforehand — reducing your exposure to legal claims.',
      },
      {
        icon: '✍️',
        title: 'Documentation of Consent',
        body: 'A written, signed waiver creates a clear record of the client\'s acknowledgement and consent and avoids relying solely on a verbal agreement.',
      },
      {
        icon: '🛡️',
        title: 'Insurance Requirements',
        body: 'Some tattoo studio insurers may require or recommend signed client consent and waiver records. Check your individual policy and insurer requirements, as documentation requirements vary.',
      },
    ],
  },
  {
    slug: 'yoga-waiver',
    title: 'Yoga Studio Waiver',
    emoji: '🧘',
    activityType: 'Yoga Studio',
    metaDescription: 'Generate a yoga studio liability waiver for your classes. Customised with your governing state, covers injury risk, props, and hot yoga. Free to preview and download.',
    intro: [
      'Yoga may look gentle, but injuries from overstretching, inversions, and improper technique send thousands of practitioners to the doctor each year. A yoga studio waiver protects your business and ensures every student acknowledges these risks before stepping onto the mat.',
      'Hot yoga studios face additional considerations — heat-related illness, dehydration, and cardiovascular risks are real concerns that your waiver must address. Props like blocks, straps, and bolsters introduce their own liability exposure.',
      'WaiverTemplate creates a yoga-specific waiver that covers your class offerings, your studio\'s environment, and your selected governing state.',
    ],
    clauses: [
      'Physical strain and injury risk from poses',
      'Inversion and advanced pose risk acknowledgment',
      'Hot yoga heat and dehydration risk (if applicable)',
      'Pre-existing injury and medical condition disclosure',
      'Instructor guidance and modification acceptance',
      'Props and equipment use acknowledgment',
      'Photography and social media waiver',
      'Assumption of risk for all yoga activities',
      'Emergency medical authorization',
      'Governing-law section for your selected state',
    ],
    clauseDescriptions: [
      'Member acknowledges that yoga poses can cause muscle strain, joint stress, and injury, particularly when practiced beyond current ability.',
      'Specific acknowledgement of risks from headstands, shoulder stands, and other inversions that carry heightened injury potential.',
      'For studios offering hot yoga: member accepts the risks of exercising in elevated heat including dehydration and heat-related illness.',
      'Member discloses existing injuries, conditions, or limitations so the instructor can offer appropriate modifications.',
      'Member agrees to follow instructor cues and understands that modifications may be offered for safety.',
      'Member accepts responsibility when using studio-provided blocks, straps, bolsters, and other props.',
      'Optional clause allowing the studio to photograph or film classes for promotional use.',
      'Member voluntarily accepts the inherent risks of yoga practice and releases the studio from resulting claims.',
      'Authorises emergency treatment if the member is incapacitated during class.',
      'Identifies the state whose law governs the agreement.',
    ],
    faqs: [
      {
        q: 'Is yoga safe for people with injuries or health conditions?',
        a: 'Many people with injuries or health conditions practise yoga safely with appropriate modifications. Your waiver collects health information so instructors can offer suitable alternatives. Members with significant conditions should consult a physician before beginning any yoga practice.',
      },
      {
        q: 'Do I need a separate hot yoga waiver?',
        a: 'You can address hot yoga risks within a single studio waiver by including a specific heat and dehydration risk section — which WaiverTemplate does automatically when you select Yoga Studio as your activity type. Some studios prefer separate waivers for hot and non-heated classes.',
      },
      {
        q: 'Can minors attend yoga classes?',
        a: 'A parent or guardian must sign for participants under 18. Check your state\'s requirements and your insurance policy, as some policies have minimum age restrictions.',
      },
      {
        q: 'How often should members re-sign?',
        a: 'Many studios require an annual re-sign, or a new signature when a member\'s health situation changes significantly. Review your waiver policy with a local attorney or your insurer.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. WaiverTemplate generates template documents. For advice specific to your studio, state, and circumstances, consult a licensed attorney.',
      },
    ],
    whyCards: [
      {
        icon: '🧘',
        title: 'Injury Risk Documentation',
        body: 'Overstretching, improper alignment, and inversions send thousands of yoga practitioners to the doctor each year. A signed waiver documents that every student understood these risks before stepping onto your mat.',
      },
      {
        icon: '🌡️',
        title: 'Hot Yoga Heat Risks',
        body: 'Hot yoga studios face distinct liability exposure from heat-related illness and dehydration. Your waiver addresses these specific risks, ensuring students are informed about the elevated demands of a heated practice environment.',
      },
      {
        icon: '📋',
        title: 'Health Disclosure Record',
        body: 'A waiver collects health and injury disclosure from every student, giving your instructors the information they need to offer safe modifications — and documenting that the studio acted responsibly.',
      },
    ],
  },
  {
    slug: 'volunteer-waiver',
    title: 'Volunteer Waiver',
    emoji: '🤝',
    activityType: 'Volunteer',
    metaDescription: 'Create a volunteer liability waiver for your nonprofit or event. Protects your organization from injury claims. Free to preview and download.',
    intro: [
      'Nonprofits, charities, community organizations, and event organizers all need volunteer waivers to protect against liability claims. When someone volunteers for your organization, they may be exposed to physical risks, travel hazards, or other dangers — and your organization could be held responsible without a proper waiver.',
      'Volunteer waivers help document consent and assumption of risk. Workers\' compensation treatment of volunteers varies by state and organisation type — check with your insurer or a local attorney.',
      'WaiverTemplate generates a volunteer waiver tailored to your organization\'s activities, the nature of the volunteer work, and your selected governing state.',
    ],
    clauses: [
      'Voluntary participation acknowledgment',
      'Physical activity and labor risk disclosure',
      'Transportation and travel risk waiver',
      'Assumption of risk for volunteer activities',
      'No employment relationship declaration',
      'Workers\' compensation non-coverage acknowledgment',
      'Emergency medical authorization',
      'Photo and media release',
      'Confidentiality agreement (if handling sensitive information)',
      'Governing-law clause (identifying your selected state)',
    ],
    clauseDescriptions: [
      'Volunteer confirms their participation is entirely voluntary and that no compensation is expected or implied.',
      'Discloses physical risks inherent in the volunteer work, including manual labour, lifting, and outdoor activities.',
      'Volunteer accepts the risks of travel to and from the volunteer site, including transportation arranged by the organisation.',
      'Volunteer voluntarily accepts the inherent risks of the activities and releases the organisation from resulting claims.',
      'Confirms the volunteer is not an employee and that no employment relationship, benefits, or obligations arise from their participation.',
      'Volunteer acknowledges they may not be covered by the organisation\'s workers\' compensation policy and should verify their own coverage.',
      'Authorises emergency medical treatment if the volunteer is incapacitated during their service.',
      'Optional clause allowing the organisation to photograph or film volunteers for promotional and reporting purposes.',
      'For roles involving sensitive data or confidential information: volunteer agrees to maintain confidentiality.',
      'Identifies the state whose law governs the agreement.',
    ],
    faqs: [
      {
        q: 'Do volunteers need a waiver if they are just helping at an event?',
        a: 'Yes — even short-term, low-risk volunteer roles can expose your organisation to liability if a volunteer is injured. A signed waiver documents that the volunteer was informed of the risks and agreed to participate voluntarily.',
      },
      {
        q: 'Are volunteers covered by workers\' compensation?',
        a: 'Workers\' compensation coverage for volunteers varies significantly by state and by the type of organisation. Some states extend coverage to certain categories of volunteers; others do not. Check with your insurer and a local attorney before assuming coverage exists.',
      },
      {
        q: 'Can minors volunteer?',
        a: 'A parent or guardian must sign on behalf of any volunteer under 18. There may also be minimum age requirements for certain types of volunteer work under state labour law.',
      },
      {
        q: 'Should I use a separate waiver for each event or project?',
        a: 'For ongoing volunteer relationships, an annual waiver may suffice. For one-off events with distinct risks, a specific event waiver ensures the volunteer is informed of those particular circumstances. A local attorney can advise on what\'s appropriate.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. WaiverTemplate generates template documents. For advice specific to your organisation, volunteer activities, and state, consult a licensed attorney.',
      },
    ],
    whyCards: [
      {
        icon: '🤝',
        title: 'Protect Your Organisation',
        body: 'Volunteer injuries can expose nonprofits and event organisers to significant liability claims. A signed waiver documents informed consent and assumption of risk — protecting your organisation\'s resources and mission.',
      },
      {
        icon: '📋',
        title: 'Clarify the Relationship',
        body: 'A volunteer waiver clearly establishes that participants are not employees, that no compensation is owed, and that workers\' compensation may not apply — preventing misunderstandings that could become costly disputes.',
      },
      {
        icon: '📸',
        title: 'Media and Photo Rights',
        body: 'Organisations frequently photograph or film volunteer activities for reporting and promotion. A waiver with a photo/media release clause ensures you have documented consent to use these materials.',
      },
    ],
  },
  {
    slug: 'rock-climbing-waiver',
    title: 'Rock Climbing Waiver',
    emoji: '🧗',
    activityType: 'Rock Climbing',
    metaDescription: 'Generate a rock climbing liability waiver for your gym or guide service. Covers falls, equipment, belaying, rescue considerations and more. Free to preview and download.',
    intro: [
      'Rock climbing gyms and outdoor guide services face significant liability exposure. Falls, equipment failure, belay errors, and route-related hazards are inherent to the sport — and participants must clearly understand and accept these risks before you allow them to climb.',
      'Whether you run an indoor bouldering gym, a top-rope facility, or take clients on outdoor climbing trips, your waiver needs to address the specific risks of your environment. Indoor walls have different hazards than granite crags, and your waiver should reflect that.',
      'WaiverTemplate generates a climbing-specific waiver that covers your facility type, your equipment rental program, and the liability laws of your state.',
    ],
    clauses: [
      'Fall and impact risk acknowledgment',
      'Belay technique and equipment use responsibility',
      'Rope, harness, and gear inspection obligation',
      'Route difficulty and rating system understanding',
      'Spotting responsibility for bouldering',
      'Outdoor climbing environmental hazard disclosure',
      'Physical fitness and health condition disclosure',
      'Instruction and supervision terms',
      'Emergency medical authorization',
      'Equipment rental liability terms',
    ],
    clauseDescriptions: [
      'Climber explicitly acknowledges that falls are inherent to climbing and accepts the risk of impact injuries at all heights.',
      'Climber accepts responsibility for learning and correctly applying belay technique and for using equipment as instructed.',
      'Climber confirms they have inspected ropes, harness, and all gear before each climb and accept responsibility for proper fit.',
      'Climber acknowledges the route grading system and accepts responsibility for choosing routes appropriate to their ability.',
      'For bouldering areas: climber accepts responsibility for providing and receiving appropriate spotting from fellow climbers.',
      'For outdoor climbing: climber accepts risks from rock quality, weather changes, wildlife, and other environmental factors.',
      'Climber discloses health conditions that could affect their safety during climbing, including cardiovascular and musculoskeletal conditions.',
      'Climber agrees to follow all instructor and staff guidance and accepts that supervision levels vary by route and facility area.',
      'Authorises emergency medical treatment if the climber is incapacitated.',
      'Climber accepts liability for damage to rented equipment caused by misuse or negligence.',
    ],
    faqs: [
      {
        q: 'Is a rock climbing waiver enforceable?',
        a: 'Waivers can limit liability for inherent risks of the sport — falls, equipment wear, and route difficulty — but enforceability varies by state and by the specific circumstances. A waiver does not protect against claims arising from the facility\'s gross negligence or wilful misconduct. Consult a local attorney familiar with recreational liability in your state.',
      },
      {
        q: 'Do I need a different waiver for indoor vs outdoor climbing?',
        a: 'The risks differ significantly: indoor facilities focus on equipment, fall zones, and training area rules; outdoor settings add environmental hazards, access conditions, and rescue considerations. Many operators use a single waiver with sections addressing both environments. Consider whether your specific mix of offerings warrants separate documents.',
      },
      {
        q: 'Can minors climb at my facility?',
        a: 'A parent or guardian must sign on behalf of any climber under 18. Check your state\'s requirements and your insurance policy for any minimum age restrictions on specific activities such as lead climbing.',
      },
      {
        q: 'How often should climbers re-sign?',
        a: 'Many facilities require an annual waiver renewal. Some require a fresh signature for specific activities like lead climbing or outdoor trips. Your insurer may have a preference — check your policy.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. WaiverTemplate generates template documents. For advice specific to your climbing facility, guide service, and state, consult a licensed attorney.',
      },
    ],
    whyCards: [
      {
        icon: '🧗',
        title: 'Inherent Sport Risk Documentation',
        body: 'Falls are part of climbing. A signed waiver documents that every participant understood this before they touched the wall or rock — providing a clear record if a claim arises from an inherent sport risk.',
      },
      {
        icon: '🔧',
        title: 'Equipment and Gear Responsibility',
        body: 'Climbing equipment failures and misuse are a leading cause of climbing injuries. Your waiver assigns inspection and proper-use responsibility to the climber, and sets clear terms for any rental equipment liability.',
      },
      {
        icon: '🌄',
        title: 'Outdoor Hazard Disclosure',
        body: 'Outdoor climbing introduces environmental risks that indoor facilities do not face. Your waiver explicitly discloses these hazards — rock quality, weather, wildlife, access conditions — so participants make an informed choice.',
      },
    ],
  },
  {
    slug: 'dog-grooming-waiver',
    title: 'Dog Grooming Waiver',
    emoji: '🐕',
    activityType: 'Dog Grooming',
    metaDescription: 'Generate a dog grooming liability waiver for your salon or mobile service. Covers pet handling risks, bites, allergies, medical conditions, and animal behaviour. Free to preview and download.',
    intro: [
      'Dog groomers face liability from multiple angles: injuries to the groomer from biting or scratching, injuries to the pet during grooming, and stress-related health events in dogs with undisclosed medical conditions. A grooming waiver documents the owner\'s consent and protects your business.',
      'Older dogs, brachycephalic breeds (like Bulldogs and Pugs), and pets with heart or respiratory conditions are at elevated risk during grooming sessions. Your waiver collects this information upfront and establishes that the owner is aware of and accepts these risks.',
      'WaiverTemplate generates a grooming-specific waiver that protects your salon, covers your specific services, and identifies your selected governing state.',
    ],
    clauses: [
      'Pet health condition and medication disclosure',
      'Stress and anxiety risk acknowledgment',
      'Matting and dematting procedure consent',
      'Breed-specific health risk disclosure',
      'Age-related grooming risk (senior pets)',
      'Unexpected health event acknowledgment',
      'Right to stop service and refer to veterinarian',
      'Photo release for portfolio and social media',
      'Emergency veterinary authorization',
      'Governing-law section for your selected state',
    ],
    clauseDescriptions: [
      'Owner discloses all known health conditions, medications, and allergies that could affect the pet during grooming.',
      'Owner acknowledges that grooming can be stressful for some pets, particularly those with anxiety, and accepts this inherent risk.',
      'Owner consents to dematting procedures if needed and understands that severely matted coats may need to be clipped short.',
      'Owner acknowledges that certain breeds face elevated grooming risks due to conformation (e.g. brachycephalic breeds, flat-faced dogs).',
      'Owner acknowledges that elderly pets face higher risks during grooming, including cardiovascular stress and mobility issues.',
      'Owner accepts that unexpected health events (seizures, cardiac events) can occur during grooming and releases the groomer from liability for pre-existing conditions.',
      'Grants the groomer the right to pause or stop grooming and refer the pet to a veterinarian if a health concern arises.',
      'Optional clause allowing the groomer to photograph finished groom results for portfolio and social media use.',
      'Owner authorises the groomer to seek emergency veterinary treatment if the pet requires urgent care.',
      'Identifies the state whose law governs the agreement.',
    ],
    faqs: [
      {
        q: 'What if my dog has a reaction during grooming?',
        a: 'Your waiver documents that you disclosed your pet\'s known health conditions. If a reaction occurs, the groomer has authorization to seek emergency veterinary treatment. The waiver clarifies that reactions arising from pre-existing or undisclosed conditions are the owner\'s responsibility.',
      },
      {
        q: 'Do I need a separate waiver for each groom?',
        a: 'Many groomers use an annual waiver; others require a new form for each visit. If your pet\'s health or medications have changed, a fresh waiver ensures the groomer has current information. Check with your insurer for their preference.',
      },
      {
        q: 'Is my senior dog at higher risk during grooming?',
        a: 'Older dogs can be more sensitive to the stress, heat, and handling involved in grooming. The waiver addresses this specifically so owners are informed and can make decisions accordingly. For very senior or medically fragile dogs, a brief veterinary check-up before grooming may be appropriate.',
      },
      {
        q: 'What about brachycephalic breeds like Bulldogs and Pugs?',
        a: 'Flat-faced breeds face elevated respiratory risk during grooming, particularly in warm environments. Your WaiverTemplate waiver includes a breed-specific risk section to ensure owners of these breeds are explicitly informed.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. WaiverTemplate generates template documents. For advice specific to your grooming business and state, consult a licensed attorney.',
      },
    ],
    whyCards: [
      {
        icon: '🐾',
        title: 'Pet Health Disclosure',
        body: 'Groomers need to know about heart conditions, seizures, anxiety, and medications before handling any pet. A signed waiver collects this information upfront — protecting both the animal and your business.',
      },
      {
        icon: '⚕️',
        title: 'Emergency Authorization',
        body: 'If a pet requires urgent veterinary care during grooming, a signed waiver gives you the legal authorization to act immediately — without waiting for owner contact that may be delayed.',
      },
      {
        icon: '📸',
        title: 'Breed-Specific Risk Documentation',
        body: 'Brachycephalic breeds, senior pets, and animals with undisclosed conditions present elevated risk. Documenting owner awareness of these risks protects your business and demonstrates professional care standards.',
      },
    ],
  },
  {
    slug: 'horse-riding-waiver',
    title: 'Horse Riding Waiver',
    emoji: '🏇',
    activityType: 'Horse Riding',
    metaDescription: 'Create a horse riding liability waiver for your stable or riding school. Covers fall risk, equine-specific risks, and your selected governing state. Free to preview and download.',
    intro: [
      'WaiverTemplate generates a horse riding waiver with equine-specific risk acknowledgements and your selected governing state. Equine activity laws vary by state, so businesses should verify any state-specific statutory notice or wording requirements separately.',
      'Stables, riding schools, trail ride operators, and equine therapy providers all need signed waivers before any rider mounts. The inherent unpredictability of horses — spooking, bucking, biting — must be clearly disclosed to participants regardless of their experience level.',
      'Your waiver documents that participants have been informed of these inherent risks and have chosen to proceed voluntarily.',
    ],
    clauses: [
      'Equine unpredictability and inherent risk acknowledgment',
      'Governing-law section identifying your selected state',
      'Fall and impact injury risk disclosure',
      'Rider experience and skill level declaration',
      'Equipment inspection and proper fit responsibility',
      'Trail hazard and terrain risk acknowledgment',
      'Animal bite, kick, and crush risk disclosure',
      'Helmet and safety equipment requirements',
      'Emergency medical authorization',
      'Minor rider parental consent provisions',
    ],
    clauseDescriptions: [
      'Rider explicitly acknowledges that horses are unpredictable animals and that falls, kicks, bites, and other injuries are inherent risks.',
      'Identifies the state whose law governs the agreement — populates the governing-law section of your waiver.',
      'Rider accepts the risk of injury from falling at various heights and speeds depending on the riding activity.',
      'Rider certifies their experience level accurately so the operator can assign an appropriate horse and level of supervision.',
      'Rider confirms they have inspected and properly fitted their helmet, stirrups, and other safety equipment.',
      'Rider acknowledges natural terrain hazards including uneven ground, low branches, water crossings, and weather conditions.',
      'Rider accepts the risk of being bitten, kicked, or crushed, and understands these are inherent risks of equine activity.',
      'Confirms that approved safety helmets must be worn during all mounted activity.',
      'Authorises emergency medical treatment if the rider is incapacitated.',
      'For riders under 18: parent or guardian signs on behalf of the minor and consents to their participation.',
    ],
    faqs: [
      {
        q: 'Do equine liability laws affect my waiver?',
        a: 'Many US states have enacted equine activity statutes that may limit liability for inherent risks of equine activities. However, these laws vary significantly by state and do not eliminate all liability. WaiverTemplate generates a waiver with your selected governing state — but you should verify any specific statutory notice or wording requirements with a local attorney familiar with equine law in your state.',
      },
      {
        q: 'Do I need separate waivers for trail rides vs arena lessons?',
        a: 'Different activities carry different risks — trail rides involve terrain and environmental hazards; arena lessons involve repetitive technique work. Many operators use a single waiver that broadly covers all equine activities. Consider whether your activities are sufficiently distinct to warrant separate documents.',
      },
      {
        q: 'What about minor riders?',
        a: 'A parent or legal guardian must sign for any rider under 18. Some states have additional requirements for minors participating in equine activities — consult a local attorney for your state\'s specific rules.',
      },
      {
        q: 'How often should participants re-sign?',
        a: 'Many stables require a waiver at the start of each season or at each new visit. For regular lesson students, an annual waiver is common. Your insurer may have a preference — check your policy.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. WaiverTemplate generates template documents to help you document participant consent. Equine law is particularly state-specific; consult a licensed attorney in your state before relying on any waiver.',
      },
    ],
    whyCards: [
      {
        icon: '🐴',
        title: 'Inherent Equine Risk Disclosure',
        body: 'Horses are large, unpredictable animals. Falls, kicks, and spooking incidents are inherent to equine activity regardless of the horse\'s temperament or the rider\'s experience. A signed waiver documents that every participant understood this before mounting.',
      },
      {
        icon: '⚖️',
        title: 'State Equine Law Considerations',
        body: 'Many states have equine liability statutes. WaiverTemplate includes a governing-law section identifying your selected state. Businesses should verify any specific statutory notice requirements with a local attorney for their jurisdiction.',
      },
      {
        icon: '👨‍👩‍👧',
        title: 'Minor Rider Consent',
        body: 'Stables and riding schools frequently work with young riders. Your waiver includes a specific parental or guardian consent section, ensuring that a responsible adult has reviewed and acknowledged the risks on behalf of any minor participant.',
      },
    ],
  },
  {
    slug: 'personal-trainer-waiver',
    title: 'Personal Trainer Waiver',
    emoji: '🏋️',
    activityType: 'Personal Training',
    metaDescription: 'Generate a personal trainer liability waiver for your clients. Customised with your governing state, covers injury risk, PAR-Q, and professional liability. Free to preview and download.',
    intro: [
      'Personal trainers carry significant professional liability — you\'re prescribing exercise to individual clients with unique health histories, and injuries can and do happen. A proper personal training waiver and health screening document is essential before your first session with any new client.',
      'Beyond the standard liability release, personal trainers should collect a Physical Activity Readiness Questionnaire (PAR-Q) to identify contraindications to exercise. Your waiver should incorporate health screening, informed consent, and a clear statement that your services are not medical advice.',
      'WaiverTemplate generates a trainer-specific waiver that covers your training methods, your clients\' health disclosure obligations, and the liability laws of your state.',
    ],
    clauses: [
      'Physical activity readiness and health screening (PAR-Q)',
      'Physician clearance recommendation for high-risk clients',
      'Exercise program design acknowledgment',
      'Muscle strain, joint injury, and overexertion risk',
      'Assumption of risk for all prescribed exercises',
      'No medical advice disclaimer',
      'Emergency medical authorization',
      'Nutritional guidance scope limitations',
      'Session cancellation and rescheduling policy',
      'Governing-law section for your selected state',
    ],
    clauseDescriptions: [
      'Client completes a Physical Activity Readiness Questionnaire — standard industry practice to screen for contraindications to exercise before starting a training programme.',
      'For clients with identified health risks, the waiver recommends obtaining a physician\'s clearance before beginning training.',
      'Client acknowledges the exercise programme is designed by the trainer and accepts responsibility for following it as instructed.',
      'Client accepts the risk of muscle strains, joint stress, and overexertion inherent in progressive exercise programming.',
      'Client voluntarily accepts the risks of prescribed exercises and releases the trainer from claims arising from those risks.',
      'Confirms that the trainer\'s services do not constitute medical advice or treatment.',
      'Authorises emergency treatment if the client is incapacitated during a session.',
      'Clarifies the scope and limitations of any nutritional guidance provided — trainers are not licensed dietitians.',
      'Documents the studio\'s cancellation and rescheduling policy to avoid disputes.',
      'Identifies the state whose law governs the agreement.',
    ],
    faqs: [
      {
        q: 'Do I need a waiver if I train clients in their homes or outdoors?',
        a: 'Yes — the location doesn\'t affect the need for a signed waiver. Whether you train clients in a gym, their home, a park, or online, a waiver documents informed consent and assumption of risk for each client relationship.',
      },
      {
        q: 'What is a PAR-Q and why does it matter?',
        a: 'A Physical Activity Readiness Questionnaire is a standard health screening tool used before starting an exercise programme. It identifies conditions that may require physician clearance — such as heart conditions, recent surgeries, or pregnancy. Including PAR-Q screening in your waiver demonstrates professional due diligence.',
      },
      {
        q: 'Can I provide nutrition advice to clients?',
        a: 'The scope of nutrition guidance a personal trainer can legally provide varies by state. Your WaiverTemplate waiver includes a nutritional guidance scope limitation clause that clarifies you are not a licensed dietitian — protecting you from claims arising from dietary recommendations.',
      },
      {
        q: 'Should I use a separate contract for each client?',
        a: 'Many trainers use a combination of a liability waiver and a separate service agreement covering payment terms, cancellation policy, and session structure. WaiverTemplate covers the liability and consent elements; you may want a separate business contract for the commercial terms.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. WaiverTemplate generates template documents. For advice specific to your training business, client relationships, and state, consult a licensed attorney.',
      },
    ],
    whyCards: [
      {
        icon: '💪',
        title: 'Professional Liability Protection',
        body: 'Personal trainers prescribe exercise to individual clients with unique health histories. A signed waiver and health screening document demonstrates you acted responsibly — and provides a record of each client\'s informed consent before training began.',
      },
      {
        icon: '🩺',
        title: 'Health Screening Documentation',
        body: 'PAR-Q screening identifies clients who may need physician clearance before exercise. Documenting this process protects you if a client experiences a health event during training, showing you followed industry-standard pre-screening protocols.',
      },
      {
        icon: '📋',
        title: 'Scope of Service Clarity',
        body: 'Your waiver clearly documents that your services are personal training — not medical advice or dietitian services. This protects you from claims that fall outside your professional scope and demonstrates transparent communication with clients.',
      },
    ],
  },
];
