const nodes = [
    {
        "id": "",
        "projectid": "",
        "order": "",
        "phase": "",
        "length": 1,
        "short_desc": "",
        "long_desc": ""
    }, 
    // ------------------- LINES OF DESCENT -------------------
    {
        "id": "LOD_A1",
        "projectid": "LOD",
        "order": "A",
        "phase": "PH",
        "length": 2,
        "short_desc": "Defined the core phenomenon: visualizing genetic bottleneck effects in populations.",
        "long_desc": "The team identified the core phenomenon to visualize: how genetic bottlenecks reduce genetic diversity in populations. Working closely with FinnGen researchers and the Nature editorial team, they determined that the visualization should show how a sudden population reduction leads to homogenization of genetic traits over generations. This initial framing emphasized the cellular level of genetic inheritance while maintaining biological accuracy for the Nature audience."
    },
    {
        "id": "LOD_A2",
        "projectid": "LOD",
        "order": "A",
        "phase": "UC",
        "length": 2,
        "short_desc": "Identified primary users: geneticists and educated general readers of Nature.",
        "long_desc": "The team mapped out two primary use cases: nature scientists and researchers who needed to understand genetic bottleneck mechanisms for their work, and the general readership of Nature who would encounter the visualization as cover artwork. This led to the decision that the tool needed to balance scientific accuracy with intuitive, visually engaging interaction—allowing researchers to manually add generations and observe effects, while remaining accessible to non-specialists viewing the cover."
    },
    {
        "id": "LOD_B0",
        "projectid": "LOD",
        "order": "B",
        "phase": "FU",
        "length": 2,
        "short_desc": "Defined core functionalities: generational simulation, color inheritance tracking, and interactive population control.",
        "long_desc": "Based on the phenomenon and use cases, the team specified that the tool needed to: allow users to add population generations with a single click, track genetic mutations through color representation, show visual clustering of traits as bottlenecks occur, and enable users to create population splits to observe divergence. The team also decided to implement both cellular automata logic for generation progression and agent-based reasoning for individual mutation inheritance."
    },
    {
        "id": "LOD_C0",
        "projectid": "LOD",
        "order": "C",
        "phase": "VI",
        "length": 3,
        "short_desc": "Explored color encoding, grid layouts, and visual feedback mechanisms for genetic representation.",
        "long_desc": "The visualization team spent significant time exploring how to visually represent genetic mutations. They experimented with different color palettes to ensure accessibility while maintaining aesthetic appeal for a Nature cover. They tested various grid arrangements and explored how visual clustering of colors would emerge naturally from the genetic bottleneck logic. Additionally, they designed visual feedback for user interactions (clicking to add generations) and explored animation possibilities to show transitions between generational states."
    },
    {
        "id": "LOD_D1",
        "projectid": "LOD",
        "order": "D",
        "phase": "PH",
        "length": 1,
        "short_desc": "Refined phenomenon understanding based on initial visualization explorations.",
        "long_desc": "After initial visualization experiments, the team revisited their phenomenon definition. They discovered that the cellular automata approach revealed interesting emergent behaviors around mutation drift that they hadn't anticipated. This led to a slight refocusing: the tool should emphasize not just bottleneck effects, but the random nature of genetic drift within bottleneck scenarios, showing that even without selection pressure, genetic variation can disappear unpredictably."
    },
    {
        "id": "LOD_D2",
        "projectid": "LOD",
        "order": "D",
        "phase": "DI",
        "length": 1,
        "short_desc": "Specified data requirements: individual-level genetic states and probabilistic mutation rules.",
        "long_desc": "The team defined the data model needed: each cell represents an individual with a genetic state (color). The data structure needed to support multiple individuals per generation, inheritance rules where offspring randomly inherit parent traits with occasional mutations, and population-level statistics for calculating bottleneck severity. They also determined that the simulation should use simplified Mendelian inheritance rules rather than full genomic complexity."
    },
    {
        "id": "LOD_D3",
        "projectid": "LOD",
        "order": "D",
        "phase": "FU",
        "length": 2,
        "short_desc": "Added functionality for population branching and multi-path analysis.",
        "long_desc": "Based on the refined phenomenon understanding and visualization explorations, the team added a critical functionality: the ability to split a population at any generation point, allowing users to see how different branches evolve independently after bottleneck events. This required new interaction patterns (branch creation UI) and computational logic to track separate population lineages simultaneously."
    },
    {
        "id": "LOD_E1",
        "projectid": "LOD",
        "order": "E",
        "phase": "VI",
        "length": 1,
        "short_desc": "Refined visualization to clarify branch relationships and generational progression.",
        "long_desc": "With branching functionality confirmed, the visualization needed refinement to clearly show population splits and separate evolutionary paths. The team experimented with different spatial arrangements for branches and explored visual connections showing parent-child relationships between branches. They also refined the grid layout to make generational time progression visually clear and intuitive."
    },
    {
        "id": "LOD_E2",
        "projectid": "LOD",
        "order": "E",
        "phase": "DE",
        "length": 2,
        "short_desc": "Implemented cellular automata engine and interactive branch system.",
        "long_desc": "The development team built the core simulation engine using cellular automata principles to generate generational progressions. They implemented the genetic inheritance logic with mutation probabilities, created the data structures to support multiple population branches, and built the user interaction system for clicking to add generations and creating splits. This phase involved significant algorithm optimization to ensure smooth interactions even with large populations."
    },
    {
        "id": "LOD_F0",
        "projectid": "LOD",
        "order": "F",
        "phase": "FU",
        "length": 2,
        "short_desc": "Expanded with analytics features: diversity metrics and statistical summaries.",
        "long_desc": "To enhance scientific credibility for the Nature audience, the team added features to display genetic diversity metrics alongside the visualization. This included calculating and displaying allele frequencies, tracking homozygosity levels, and showing how diversity changes across generations. These features required additional data tracking and computational analysis but significantly increased the educational value for researchers."
    },
    {
        "id": "LOD_G1",
        "projectid": "LOD",
        "order": "G",
        "phase": "DI",
        "length": 1,
        "short_desc": "Collected diversity metric data structures and real genetic datasets for validation.",
        "long_desc": "The team gathered population genetic datasets and bottleneck case studies to validate their simulation against real-world scenarios. They defined data structures for tracking allele frequencies and diversity indices, and created datasets representing documented genetic bottlenecks (like the Founder effect in isolated populations) to benchmark their visualization."
    },
    {
        "id": "LOD_G2",
        "projectid": "LOD",
        "order": "G",
        "phase": "UC",
        "length": 1,
        "short_desc": "Validated use cases with geneticists and Nature editorial team on feature completeness.",
        "long_desc": "The team conducted feedback sessions with FinnGen geneticists and Nature editors to ensure the expanded feature set met their needs. They confirmed that diversity metrics were valuable for teaching bottleneck concepts and that the simulation matched expected genetic behaviors. This validation ensured the tool would serve both scientific and editorial purposes effectively."
    },
    {
        "id": "LOD_H0",
        "projectid": "LOD",
        "order": "H",
        "phase": "DE",
        "length": 3,
        "short_desc": "Developed analytics display, optimized performance, and created publication-ready version.",
        "long_desc": "The development team implemented the diversity metrics calculations and created visualizations for displaying them alongside the main simulation. They optimized rendering for smooth interactions with large populations and different screen sizes for both web and print contexts. Significant effort went into creating the final publication-ready version for the Nature cover, including aesthetic refinements and ensuring visual clarity at print resolution."
    },
    {
        "id": "LOD_I0",
        "projectid": "LOD",
        "order": "I",
        "phase": "VI",
        "length": 2,
        "short_desc": "Fine-tuned visual design for Nature cover publication, optimized color accessibility.",
        "long_desc": "The visualization team made final refinements for the Nature cover context. They optimized color choices for colorblind accessibility while maintaining visual impact. They refined typography, spacing, and visual hierarchy to work at cover size. The team also created variations for different contexts (web interactive version vs. static cover image) ensuring the core visual concept remained consistent across media."
    },
    {
        "id": "LOD_J0",
        "projectid": "LOD",
        "order": "J",
        "phase": "DE",
        "length": 1,
        "short_desc": "Final code optimization and cross-browser compatibility testing.",
        "long_desc": "The development team performed final optimizations to ensure the tool ran smoothly across different browsers and devices. They cleaned up code, removed debugging elements, and ensured the interactive version would perform well on the Aalto University server. This phase included stress-testing the simulation with large populations and long generational sequences."
    },
    {
        "id": "LOD_K0",
        "projectid": "LOD",
        "order": "K",
        "phase": "TE",
        "length": 1,
        "short_desc": "Conducted internal testing with collaborators on biological accuracy and usability.",
        "long_desc": "The team performed comprehensive testing with FinnGen collaborators and geneticists to verify biological accuracy of the simulation. They tested user interactions to ensure the interface was intuitive and the visualizations correctly represented the intended genetic concepts. Feedback resulted in minor adjustments to visual clarity and helped validate that the tool effectively communicated the bottleneck phenomenon."
    },
    {
        "id": "LOD_L1",
        "projectid": "LOD",
        "order": "L",
        "phase": "DI",
        "length": 1,
        "short_desc": "Gathered additional genetic reference data for supplementary materials.",
        "long_desc": "Based on testing feedback, the team collected additional population genetic data to create supplementary educational materials. This included real bottleneck case studies and comparison datasets that could accompany the visualization to help viewers understand real-world applications of the concepts shown."
    },
    {
        "id": "LOD_L2",
        "projectid": "LOD",
        "order": "L",
        "phase": "UC",
        "length": 2,
        "short_desc": "Explored extended user scenarios: classroom use, research applications, and public engagement.",
        "long_desc": "After initial testing, the team recognized broader potential use cases beyond the Nature cover. They explored how the tool could be used in genetics classrooms to teach bottleneck concepts, how researchers could use it to explore specific population scenarios, and how it could engage the public in understanding genetic diversity. This led to decisions about adding educational modes and documentation."
    },
    {
        "id": "LOD_M1",
        "projectid": "LOD",
        "order": "M",
        "phase": "FU",
        "length": 2,
        "short_desc": "Added presets, documentation, and educational features for broader audiences.",
        "long_desc": "Based on the expanded use cases, the team implemented preset scenarios (famous bottlenecks, diverse scenarios) that users could load to explore specific cases. They created in-app documentation explaining genetic concepts and added tutorial modes for educational use. These features required careful content writing to explain complex genetics accessibly."
    },
    {
        "id": "LOD_M2",
        "projectid": "LOD",
        "order": "M",
        "phase": "DE",
        "length": 2,
        "short_desc": "Implemented educational features and deployed web version.",
        "long_desc": "The development team built the preset system, created interactive tutorials, and implemented context-sensitive help. They deployed the interactive tool to the Aalto University server and created supporting documentation. They also optimized the web version for educational institutional access and ensured it would work in classroom environments with varying network conditions."
    },
    {
        "id": "LOD_N0",
        "projectid": "LOD",
        "order": "N",
        "phase": "VI",
        "length": 1,
        "short_desc": "Created visual tutorials and educational graphics.",
        "long_desc": "The visualization team created step-by-step visual guides for using the tool effectively. They designed infographics explaining key genetic concepts and bottleneck scenarios. These materials were designed to be accessible to high school and undergraduate students while remaining scientifically accurate."
    },
    {
        "id": "LOD_O0",
        "projectid": "LOD",
        "order": "O",
        "phase": "DE",
        "length": 2,
        "short_desc": "Built deployment infrastructure and created supplementary web content.",
        "long_desc": "The team set up the web hosting infrastructure on Aalto servers, configured analytics to track tool usage, and created supplementary web pages with background information about genetic bottlenecks. They ensured the tool was discoverable through search and accessible from the FinnGen project website."
    },
    {
        "id": "LOD_P0",
        "projectid": "LOD",
        "order": "P",
        "phase": "TE",
        "length": 1,
        "short_desc": "Conducted external testing with educators and general public feedback.",
        "long_desc": "The team released the tool to a limited group of educators and members of the public to gather feedback. They tested whether the educational features effectively explained bottleneck concepts and whether the tool interface remained intuitive for users without visualization design background. Feedback was overwhelmingly positive regarding accessibility and educational value."
    },
    // ------------------- WHAT IS FINNGEN --------------------
    {
        "id": "WIFG_A0",
        "projectid": "WIFG",
        "order": "A",
        "phase": "UC",
        "length": 2,
        "short_desc": "Mapped diverse user groups: public citizens, researchers, healthcare providers, and policymakers.",
        "long_desc": "The team identified that FinnGen needed to communicate to multiple distinct audiences with different knowledge levels and interests. Finnish citizens needed to understand why their health data was valuable and secure. Researchers needed to learn how to access and use FinnGen resources. Healthcare providers needed to understand how findings could impact clinical practice. Policymakers needed to see the societal value. Each group had different information needs and communication preferences."
    }, 
    {
        "id": "WIFG_B1",
        "projectid": "WIFG",
        "order": "B",
        "phase": "PH",
        "length": 1,
        "short_desc": "Defined phenomenon: making complex genetic research transparent and accessible to Finnish public.",
        "long_desc": "The project's core focus became making genetic research understandable and trustworthy for the general public. The phenomenon to communicate was not just 'what is FinnGen,' but 'why should I care about FinnGen' and 'is my data safe.' The team emphasized the journey from data collection through discovery to real-world health impacts, showing how citizen participation directly contributes to medical breakthroughs."
    },
    {
        "id": "WIFG_B2",
        "projectid": "WIFG",
        "order": "B",
        "phase": "FU",
        "length": 2,
        "short_desc": "Outlined core functionality: narrative progression, interactive data journey, and impact demonstrations.",
        "long_desc": "The team defined that the website needed to guide users through a complete narrative journey: understanding FinnGen's mission, learning how data collection works, seeing how data becomes research findings, and discovering health impacts. They planned interactive elements to show data transformation at each stage and created decision points where users could explore different aspects more deeply based on their interests."
    },
    {
        "id": "WIFG_C1",
        "projectid": "WIFG",
        "order": "C",
        "phase": "DI",
        "length": 1,
        "short_desc": "Specified data sources: population statistics, research findings, health registry data, and citizen stories.",
        "long_desc": "The team gathered diverse data sources: current FinnGen statistics (participant numbers, health conditions studied), real research findings with privacy-appropriate details, data from Finnish health registries showing disease prevalence, and personal stories from citizen participants explaining their motivation. This mix of quantitative and narrative data was essential for the scrollytelling approach."
    },
    {
        "id": "WIFG_C2",
        "projectid": "WIFG",
        "order": "C",
        "phase": "VI",
        "length": 3,
        "short_desc": "Developed scrollytelling visual strategy: progressive revelation, engaging graphics, and emotional resonance.",
        "long_desc": "The visualization team created a scrollytelling concept where information reveals progressively as users scroll. They designed engaging graphics showing data transformation from collection to research findings. They explored emotional design approaches using citizen stories and visualizations of real health impacts. They tested different color palettes and typography to create a trustworthy but engaging visual identity that would resonate with Finnish citizens."
    },
    {
        "id": "WIFG_D0",
        "projectid": "WIFG",
        "order": "D",
        "phase": "DE",
        "length": 2,
        "short_desc": "Built scrollytelling website with progressive data visualizations and narrative flow.",
        "long_desc": "The development team constructed the scrollytelling website using modern web technologies. They implemented scroll-triggered animations revealing visualizations progressively. They created responsive layouts that worked on mobile and desktop, crucial for public accessibility. The team integrated real FinnGen data and implemented content management systems allowing the FinnGen team to update information without code changes."
    },
    {
        "id": "WIFG_E0",
        "projectid": "WIFG",
        "order": "E",
        "phase": "TE",
        "length": 1,
        "short_desc": "Conducted internal testing with FinnGen leadership and communications team.",
        "long_desc": "The team tested the website with FinnGen project leadership and communications specialists to ensure scientific accuracy and appropriate messaging. They verified that the site effectively communicated FinnGen's mission and the value of citizen participation. Feedback led to some content adjustments and improved clarity around data privacy and security."
    },
    {
        "id": "WIFG_F1",
        "projectid": "WIFG",
        "order": "F",
        "phase": "DI",
        "length": 1,
        "short_desc": "Collected expanded dataset: more health conditions, additional research outcomes, and healthcare impact examples.",
        "long_desc": "Based on testing feedback, the team expanded the data collection to include more diverse health conditions and additional research examples. They gathered specific healthcare impact stories showing how FinnGen discoveries influenced clinical practice. This expanded dataset provided more comprehensive coverage of the project's scope and diversity of findings."
    },
    {
        "id": "WIFG_F2",
        "projectid": "WIFG",
        "order": "F",
        "phase": "FU",
        "length": 2,
        "short_desc": "Added interactive elements: health explorer, research browser, and participation guide.",
        "long_desc": "To make the website more engaging and useful, the team added interactive features allowing users to explore specific health conditions studied by FinnGen, browse research findings by category, and learn how to participate in the project. These tools transformed the site from informational to interactive and action-enabling, encouraging citizens to engage beyond passive reading."
    },
    {
        "id": "WIFG_G0",
        "projectid": "WIFG",
        "order": "G",
        "phase": "VI",
        "length": 1,
        "short_desc": "Refined visual design for interactive tools and created consistent icon system.",
        "long_desc": "The visualization team refined the design of the interactive elements to maintain visual consistency while supporting functional clarity. They created an icon system for health conditions and research types. They ensured the interactive tools maintained the emotional, trustworthy design aesthetic while being highly usable."
    },
    {
        "id": "WIFG_H0",
        "projectid": "WIFG",
        "order": "H",
        "phase": "DE",
        "length": 2,
        "short_desc": "Developed interactive tools, search functionality, and content management enhancements.",
        "long_desc": "The development team built the health condition explorer with filtering and search capabilities, the research browser with categorization and sorting, and the participation guide with enrollment information. They upgraded the content management system to support the interactive features and created admin tools for FinnGen to manage content updates."
    },
    {
        "id": "WIFG_I1",
        "projectid": "WIFG",
        "order": "I",
        "phase": "UC",
        "length": 1,
        "short_desc": "Validated expanded use cases with citizen panels and healthcare professionals.",
        "long_desc": "The team conducted user testing with representative citizen groups and healthcare professionals to validate that the new interactive features supported their needs. Citizens provided feedback on information clarity and trust. Healthcare providers tested the research browser to ensure it met their needs for staying informed about applicable findings."
    },
    {
        "id": "WIFG_I2",
        "projectid": "WIFG",
        "order": "I",
        "phase": "VI",
        "length": 2,
        "short_desc": "Created visual documentation, help systems, and accessibility enhancements.",
        "long_desc": "Based on user testing, the visualization team created visual tutorials showing how to use interactive tools, enhanced accessibility features for users with visual impairments, and created help systems with clear iconography. They conducted thorough accessibility audits to ensure the site met WCAG standards, crucial for reaching all Finnish citizens."
    },
    {
        "id": "WIFG_J0",
        "projectid": "WIFG",
        "order": "J",
        "phase": "TE",
        "length": 1,
        "short_desc": "Conducted external beta testing with public user groups and healthcare institution partners.",
        "long_desc": "The team released the updated website to beta testers including Finnish citizens, patient organizations, and healthcare institutions. They collected feedback on ease of use, information clarity, and whether the site effectively conveyed FinnGen's value. The testing revealed high satisfaction with both the informational and interactive aspects of the site."
    },
    {
        "id": "WIFG_K0",
        "projectid": "WIFG",
        "order": "K",
        "phase": "DE",
        "length": 3,
        "short_desc": "Final optimization, multilingual support, and production deployment.",
        "long_desc": "The development team optimized performance for users across Finland with varying internet speeds. They implemented multilingual support for Swedish (Finland's second official language) and ensured content could easily be translated to other languages. They set up analytics to track user engagement, established monitoring systems, and deployed the site to production servers with appropriate scaling for anticipated traffic."
    },
    {
        "id": "WIFG_L0",
        "projectid": "WIFG",
        "order": "L",
        "phase": "TE",
        "length": 1,
        "short_desc": "Post-launch testing and monitoring of public usage patterns.",
        "long_desc": "After launch, the team monitored the website closely for technical issues and tracked user engagement patterns. They identified which sections resonated most with visitors and where users encountered difficulties. Analytics showed high engagement with the interactive tools and positive sentiment in user feedback, validating the design approach."
    },
    // ------------------- V3C -------------------
    {
        "id": "V3C_A1",
        "projectid": "V3C",
        "order": "A",
        "phase": "DI",
        "length": 1,
        "short_desc": "Analyzed variant calling data characteristics and challenges with rare variants.",
        "long_desc": "The team studied how variant calling works in Affymetrix chip data and identified where quality breaks down. They examined cluster plots from the Affymetrix system and documented the specific problems: rare variants showed poor cluster separation, many missing genotype calls, and automated callers consistently struggled. They quantified the impact—many rare variants couldn't be used in research due to quality concerns."
    }, 
    {
        "id": "V3C_A2",
        "projectid": "V3C",
        "order": "A",
        "phase": "FU",
        "length": 1,
        "short_desc": "Defined core functionality: cluster visualization, manual genotype input, and quality assessment.",
        "long_desc": "Based on the data challenges, the team specified that the tool needed to display cluster plots clearly enough for expert visual judgment, allow researchers to manually specify genotype calls, and provide mechanisms to assess and improve data quality. The interface needed to be efficient—researchers would need to correct many variants, so interaction had to be streamlined."
    }, 
    {
        "id": "V3C_B1",
        "projectid": "V3C",
        "order": "B",
        "phase": "PH",
        "length": 1,
        "short_desc": "Focused phenomenon: enabling rare variant research through manual quality correction.",
        "long_desc": "The project's core phenomenon was that rare genetic variants, while potentially highly important for understanding disease, were being discarded due to automated calling quality issues. The tool would empower researchers to visually assess variant quality and make informed calls, recovering valuable rare variant data for research use."
    }, 
    {
        "id": "V3C_B2",
        "projectid": "V3C",
        "order": "B",
        "phase": "UC",
        "length": 2,
        "short_desc": "Identified primary users: FinnGen researchers and geneticists analyzing rare variants.",
        "long_desc": "The team recognized that the tool's primary users would be skilled geneticists at FinnGen who understood cluster plots and could make informed genotype calls. They understood the biological context well and could recognize when patterns indicated true variants versus artifacts. The team designed the tool specifically for expert users, prioritizing efficiency and data access over broad accessibility."
    },
    {
        "id": "V3C_C1",
        "projectid": "V3C",
        "order": "C",
        "phase": "DI", 
        "length": 2,
        "short_desc": "Examined clustering patterns and identified metadata needed for variant filtering.", 
        "long_desc": "After defining the phenomenon and user focus, the team analyzed cluster plot data more deeply, studying the specific characteristics that made rare variants difficult to call. They identified which variant attributes (allele frequency, cluster separation quality, missing call percentages) would be most important for researchers to filter on when prioritizing corrections. This analysis informed data structure specifications."

    },
        {
        "id": "V3C_C2",
        "projectid": "V3C",
        "order": "C",
        "phase": "VI",
        "length": 2,
        "short_desc": "Designed cluster plot visualization with optimal clarity for rare variant assessment.",
        "long_desc": "The visualization team studied how geneticists visually assess cluster plots and designed an interface emphasizing clarity. They explored color schemes that would highlight cluster boundaries even when separation was subtle. They designed zoom and filtering options allowing researchers to focus on the uncertainty region where rare variants clustered poorly. The design prioritized information density for expert users."
    }, 
    {
        "id": "V3C_D1",
        "projectid": "V3C",
        "order": "D",
        "phase": "UC",
        "length": 1,
        "short_desc": "Conducted second round of user interviews on workflow and efficiency needs.",
        "long_desc": "The team interviewed FinnGen geneticists about their workflows for variant correction. They learned that researchers needed to process hundreds of variants efficiently, often working through them in priority order. Understanding these workflow patterns informed decisions about batch processing, filtering, and export functionality. Users emphasized that speed and efficiency were critical—they would use the tool only if it saved time compared to manual review."
    },
    {
        "id": "V3C_D2",
        "projectid": "V3C",
        "order": "D",
        "phase": "FU",
        "length": 1,
        "short_desc": "Added filtering, batch processing, and data export capabilities.",
        "long_desc": "To support research workflows, the team added functionality to filter variants by characteristics (frequency, chromosome location, previous call quality) to find high-priority corrections first. They implemented batch processing allowing researchers to mark corrected variants and export results. They added quality metrics showing how many variants in a dataset had been corrected and achieved high confidence calls."
    },
        {
        "id": "V3C_D3",
        "projectid": "V3C",
        "order": "D",
        "phase": "DE",
        "length": 3,
        "short_desc": "Built cluster visualization engine and interactive interface for manual calls.",
        "long_desc": "The development team constructed the core rendering engine for cluster plots using efficient graphics libraries to handle responsiveness even with large datasets. They built the genotype input interface allowing rapid marking of calls (AA, Aa, aa) and implemented zoom/pan controls for examining cluster boundaries closely. They optimized data loading and caching to support rapid navigation through hundreds of variants."
    }, 
    {
        "id": "V3C_E0",
        "projectid": "V3C",
        "order": "E",
        "phase": "TE",
        "length": 1,
        "short_desc": "Conducted expert user testing with FinnGen geneticists and quality control specialists.",
        "long_desc": "The team worked with experienced FinnGen geneticists to test the tool on real rare variant data. Testers confirmed that the cluster visualization was clear enough for accurate genotype assessment and that the interface was efficient for high-volume processing. Feedback led to minor refinements in color choices and interaction patterns."
    },
        {
        "id": "V3C_F1",
        "projectid": "V3C",
        "order": "F",
        "phase": "PH",
        "length": 1,
        "short_desc": "Reconsidered phenomenon focus based on testing insights.",
        "long_desc": "Testing revealed that the tool's impact extended beyond just recovering rare variants—it also improved understanding of variant quality and calling confidence. This reinforced the core phenomenon but highlighted additional value: the tool wasn't just a recovery mechanism, but a quality insight tool helping researchers understand the reliability of their variant calls."
    }, 
    {
        "id": "V3C_F2",
        "projectid": "V3C",
        "order": "F",
        "phase": "DI",
        "length": 1,
        "short_desc": "Gathered validation datasets with known genotypes for verification testing.",
        "long_desc": "To validate tool accuracy, the team collected variant datasets where genotypes were known through independent methods. They prepared comparison datasets to verify that manual corrections by researchers matched expected calls, providing confidence in data quality improvements."
    },
    {
        "id": "V3C_G1",
        "projectid": "V3C",
        "order": "G",
        "phase": "FU",
        "length": 1,
        "short_desc": "Implemented confidence scoring and data quality validation tools.",
        "long_desc": "Based on validation testing, the team added confidence scoring mechanisms allowing researchers to rate their certainty in each manual call. They implemented quality checks comparing manual calls against external datasets and highlighted discrepancies for review. These features ensured corrected data met research quality standards."
    },
    {
        "id": "V3C_G2",
        "projectid": "V3C",
        "order": "G",
        "phase": "VI",
        "length": 1,
        "short_desc": "Designed visual feedback for confidence scoring and quality indicators.",
        "long_desc": "The visualization team designed clear visual representations of confidence levels and quality metrics. They created color coding for confidence ratings and developed visual comparisons between manual and automated calls. These visualizations made quality improvements immediately apparent and encouraged researchers to mark their confidence level accurately."
    },
    {
        "id": "V3C_H0",
        "projectid": "V3C",
        "order": "H",
        "phase": "UC",
        "length": 1,
        "short_desc": "Validated expanded feature scope with users before development.",
        "long_desc": "The team demonstrated the planned confidence scoring and quality assessment features to FinnGen geneticists. Users confirmed these features were valuable and would enhance the tool's utility. They also provided feedback on how to implement confidence scoring in ways that were intuitive and non-burdensome during high-volume correction work."
    },
        {
        "id": "V3C_I1",
        "projectid": "V3C",
        "order": "I",
        "phase": "DI",
        "length": 1,
        "short_desc": "Prepared validation datasets and quality benchmark data.",
        "long_desc": "The team prepared comprehensive validation datasets with known genotypes for comparison against manual corrections. They organized quality benchmark data showing expected accuracy levels and created metrics frameworks for measuring improvement. This data preparation enabled quantitative validation of the tool's quality improvements."
    }, 
   {
        "id": "V3C_I2",
        "projectid": "V3C",
        "order": "I",
        "phase": "DE",
        "length": 2,
        "short_desc": "Implemented confidence scoring system and quality validation algorithms.",
        "long_desc": "The development team built the confidence scoring mechanism allowing researchers to rate certainty (1-5 scale) for each manual call. They implemented quality algorithms comparing manual calls against validation datasets and generating accuracy metrics. They created dashboards visualizing quality improvements and developed automated flagging systems highlighting potentially problematic calls that deviated from expected patterns."
    },
    {
        "id": "V3C_J0",
        "projectid": "V3C",
        "order": "J",
        "phase": "VI",
        "length": 2,
        "short_desc": "Refined visual design for quality metrics and confidence visualization.",
        "long_desc": "The visualization team polished the design of quality dashboards and confidence displays. They refined color schemes to be intuitive (clearly indicating high/low confidence and quality), optimized layouts to show comparisons clearly, and created visual explanations for metrics. They ensured that quality improvements were visually dramatic to motivate continued correction work."
    },
    {
        "id": "V3C_K0",
        "projectid": "V3C",
        "order": "K",
        "phase": "DE",
        "length": 1,
        "short_desc": "Optimized performance for quality metric calculations.",
        "long_desc": "The development team optimized algorithms for real-time quality metric calculation even with large variant sets. They implemented efficient data structures supporting rapid comparison operations and created caching systems ensuring quality calculations didn't slow down the interactive experience."
    },
    {
        "id": "V3C_L0",
        "projectid": "V3C",
        "order": "L",
        "phase": "TE",
        "length": 1,
        "short_desc": "Tested accuracy of confidence scoring and quality metrics.",
        "long_desc": "The team conducted rigorous testing ensuring confidence scores accurately reflected call uncertainty and that quality metrics correctly measured improvement. They validated that automated quality flagging was reliable and didn't produce false positives that would frustrate users."
    },
    {
        "id": "V3C_M0",
        "projectid": "V3C",
        "order": "M",
        "phase": "FU",
        "length": 2,
        "short_desc": "Added documentation, help systems, and training materials.",
        "long_desc": "Based on testing results and anticipated user needs, the team planned comprehensive documentation explaining how to interpret confidence scores, understand quality metrics, and use automated flagging effectively. They created in-app help and contextual tips. They developed tutorial scenarios showing best practices for efficient variant correction."
    },
    {
        "id": "V3C_N1",
        "projectid": "V3C",
        "order": "N",
        "phase": "DI",
        "length": 1,
        "short_desc": "Gathered real variant datasets for documentation and training examples.",
        "long_desc": "The team collected representative real-world variant datasets (with appropriate privacy protections) to use in documentation and training materials. They prepared example workflows showing different scenarios: easy variants with clear clusters, ambiguous variants requiring careful assessment, and cases where automated calling was severely wrong."
    },
    {
        "id": "V3C_N2",
        "projectid": "V3C",
        "order": "N",
        "phase": "DE",
        "length": 2,
        "short_desc": "Implemented help systems and created online documentation.",
        "long_desc": "The development team built contextual help tooltips throughout the interface, created an in-app tutorial system, and built searchable documentation. They implemented video tutorials showing efficient workflows and created FAQ sections addressing common questions about variant assessment and confidence scoring."
    },
    {
        "id": "V3C_O0",
        "projectid": "V3C",
        "order": "O",
        "phase": "TE",
        "length": 1,
        "short_desc": "Conducted final comprehensive testing with extended user group.",
        "long_desc": "The team expanded testing to include additional FinnGen geneticists and quality control specialists. Testing covered complete workflows: loading variant sets, filtering by priority, assessing and correcting multiple variants, and exporting results. Users confirmed the tool was ready for production deployment."
    },
    {
        "id": "V3C_P1",
        "projectid": "V3C",
        "order": "P",
        "phase": "VI",
        "length": 2,
        "short_desc": "Created publication-quality user interface and visual polish.",
        "long_desc": "The visualization team conducted final refinements for production readiness: ensuring consistent spacing and typography, optimizing colors for clarity on different displays, and creating a professional visual identity. They also created marketing materials showing the tool's capabilities and impact."
    },
    {
        "id": "V3C_P2",
        "projectid": "V3C",
        "order": "P",
        "phase": "DE",
        "length": 3,
        "short_desc": "Final development: deployment infrastructure, monitoring, and support systems.",
        "long_desc": "The development team set up production servers, implemented monitoring systems tracking tool usage and performance, and created error reporting mechanisms. They established data backup systems, created user account management, and built administrative dashboards for FinnGen managers to monitor correction progress and data quality improvements across the institute."
    },
    {
        "id": "V3C_Q0",
        "projectid": "V3C",
        "order": "Q",
        "phase": "TE",
        "length": 1,
        "short_desc": "Production deployment testing and user support validation.",
        "long_desc": "The team conducted final testing on production systems before public launch. They verified that data security was appropriate, that backups worked correctly, and that user support systems were functional. They tested user account creation and confirmed that all monitoring systems were working properly."
    },
    {
        "id": "V3C_R0",
        "projectid": "V3C",
        "order": "R",
        "phase": "DI",
        "length": 1,
        "short_desc": "Integrated additional rare variant reference datasets.",
        "long_desc": "Following deployment, the team integrated additional reference datasets showing expected genotype patterns for different variant types. These references helped users calibrate their visual assessment and provided additional confidence in their corrections."
    },
    {
        "id": "V3C_S0",
        "projectid": "V3C",
        "order": "S",
        "phase": "DE",
        "length": 1,
        "short_desc": "Ongoing maintenance and performance optimization.",
        "long_desc": "The development team monitored tool performance in production, optimized bottlenecks, and implemented continuous improvements. They kept systems updated and secure, and responded quickly to any issues users encountered."
    },
    {
        "id": "V3C_T0",
        "projectid": "V3C",
        "order": "T",
        "phase": "TE",
        "length": 1,
        "short_desc": "Ongoing monitoring and continuous quality improvement.",
        "long_desc": "The team continuously monitored tool usage, collected user feedback, and evaluated data quality improvements achieved. Regular testing ensured corrected variants maintained high quality standards, and the team identified opportunities for future enhancements based on usage patterns and user needs."
    },
    // ------------------- LAVAA -------------------
    {
        "id": "LAVAA_A1",
        "projectid": "LAVAA",
        "order": "A",
        "phase": "PH",
        "length": 1,
        "short_desc": "Identified phenomenon: visualizing pleiotropy and multi-phenotype effects from single variants.",
        "long_desc": "The team recognized that PheWAS (phenome-wide association studies) data showed how single genetic variants could affect multiple health outcomes, sometimes in different directions (protective for one disease, risk for another). Current visualization methods (Manhattan plots) failed to show these rich relationships and clustering patterns. The phenomenon to communicate was variant pleiotropy—the complex web of biological connections."
    },
    {
        "id": "LAVAA_A2",
        "projectid": "LAVAA",
        "order": "A",
        "phase": "DI",
        "length": 1,
        "short_desc": "Analyzed PheWAS data structure: p-values, beta values, and phenotype information.",
        "long_desc": "The team examined PheWAS datasets from FinnGen, understanding the data structure: association p-values indicating statistical significance, beta values representing effect direction and magnitude, phenotype information, case counts, and meta-analysis results. They identified that traditional Manhattan plots discarded critical information about effect direction and magnitude."
    },
    {
        "id": "LAVAA_A3",
        "projectid": "LAVAA",
        "order": "A",
        "phase": "FU",
        "length": 2,
        "short_desc": "Defined functionalities: volcano plot rendering, phenotype filtering, and export capabilities.",
        "long_desc": "The team specified that the tool needed to transform PheWAS data into volcano plot format (p-value on x-axis, effect size on y-axis), allowing visual identification of significant effects with large magnitudes. Researchers needed to filter phenotypes by category or name, highlight variants of interest, and export high-quality plots ready for publication. The tool needed to show additional attributes (case counts, credible set status) through visual encoding or hover information."
    },
    {
        "id": "LAVAA_A4",
        "projectid": "LAVAA",
        "order": "A",
        "phase": "VI",
        "length": 2,
        "short_desc": "Explored volcano plot encoding: color gradients, sizing, and visual threshold marking.",
        "long_desc": "The visualization team experimented with different visual encodings for volcano plots. They explored color gradients representing effect direction (blue for protective, red for risk), point sizing for case counts, and visual markers for genome-wide significance thresholds. They tested various layouts and explored interactive highlighting mechanisms. This foundational work established the visual language for distinguishing significant findings with varying effect magnitudes."
    },
    {
        "id": "LAVAA_B0",
        "projectid": "LAVAA",
        "order": "B",
        "phase": "UC",
        "length": 1,
        "short_desc": "Identified users: geneticists analyzing variant effects and preparing manuscripts.",
        "long_desc": "The primary users would be research geneticists needing to understand and communicate variant effects across multiple phenotypes. They needed to identify interesting patterns (variants with consistent protective effects across related phenotypes, for example) and prepare publication-ready visualizations. Secondary users included clinicians interpreting variant significance."
    },
    {
        "id": "LAVAA_C0",
        "projectid": "LAVAA",
        "order": "C",
        "phase": "VI",
        "length": 2,
        "short_desc": "Explored volcano plot encoding: color gradients, sizing, and visual threshold marking.",
        "long_desc": "The visualization team experimented with different visual encodings for volcano plots. They explored color gradients representing effect direction (blue for protective, red for risk), point sizing for case counts, and visual markers for genome-wide significance thresholds. They tested various layouts and explored interactive highlighting mechanisms. This foundational work established the visual language for distinguishing significant findings with varying effect magnitudes."
    },
    {
        "id": "LAVAA_D1",
        "projectid": "LAVAA",
        "order": "D",
        "phase": "DI",
        "length": 1,
        "short_desc": "Prepared PheWAS datasets and credible set information.",
        "long_desc": "The team integrated PheWAS data from FinnGen, including association statistics and meta-analysis results. They prepared credible set annotations showing which phenotypes had variants in credible causal sets. They organized phenotype hierarchies allowing grouping by disease category, which would enable stratified analysis."
    },
    {
        "id": "LAVAA_D2",
        "projectid": "LAVAA",
        "order": "D",
        "phase": "DE",
        "length": 3,
        "short_desc": "Developed volcano plot engine, filtering system, and interactive features.",
        "long_desc": "The development team built the core volcano plot rendering engine with D3.js, optimized for large PheWAS datasets (hundreds to thousands of associations). They implemented interactive features: filtering by phenotype group, adjustable threshold lines, hover information showing detailed statistics, and selection tools for highlighting variants. They created export functions generating publication-quality SVG and PNG files."
    },
    {
        "id": "LAVAA_E1",
        "projectid": "LAVAA",
        "order": "E",
        "phase": "FU",
        "length": 1,
        "short_desc": "Specified filtering and annotation features: phenotype groups, significance thresholds, credible sets.",
        "long_desc": "Based on visualization exploration and user needs, the team designed filtering capabilities for phenotype categories, adjustable significance thresholds, and visual highlighting of credible set variants. They planned features for annotating variants of special interest and comparing multiple variants' effects across the phenotype landscape."
    },
    {
        "id": "LAVAA_E2",
        "projectid": "LAVAA",
        "order": "E",
        "phase": "VI",
        "length": 1,
        "short_desc": "Refined visual feedback and interactive affordances for filtering and comparison.",
        "long_desc": "The visualization team designed intuitive visual feedback for filtering operations and comparison tools. They created visual indicators showing which phenotypes were selected, highlighted contrasting effects across variants, and designed interactive elements that made complex comparisons easy to perform. The design balanced information density with clarity for expert users."
    },
    {
        "id": "LAVAA_F0",
        "projectid": "LAVAA",
        "order": "F",
        "phase": "DE",
        "length": 2,
        "short_desc": "Developed volcano plot engine, filtering system, and interactive features.",
        "long_desc": "The development team built the core volcano plot rendering engine with D3.js, optimized for large PheWAS datasets (hundreds to thousands of associations). They implemented interactive features: filtering by phenotype group, adjustable threshold lines, hover information showing detailed statistics, and selection tools for highlighting variants. They created export functions generating publication-quality SVG and PNG files."
    },
    {
        "id": "LAVAA_G0",
        "projectid": "LAVAA",
        "order": "G",
        "phase": "TE",
        "length": 1,
        "short_desc": "Conducted testing with geneticists on data accuracy and visualization clarity.",
        "long_desc": "The team tested the tool with FinnGen researchers and geneticists, verifying that PheWAS data was correctly transformed to volcano plots and that visualizations effectively communicated variant effects. Users confirmed that the tool better revealed variant pleiotropy patterns compared to traditional approaches. Feedback led to refinements in default color schemes and threshold suggestions."
    },
    {
        "id": "LAVAA_H1",
        "projectid": "LAVAA",
        "order": "H",
        "phase": "FU",
        "length": 2,
        "short_desc": "Added meta-analysis visualization, comparison tools, and advanced filtering.",
        "long_desc": "The team extended functionality to show meta-analysis results across populations, display multiple variants' effects for comparison, and implement advanced filtering by credible set membership, disease category, or annotation type. These features would be valuable for researchers conducting comprehensive analysis of variant effects and preparing manuscripts with complex analyses."
    },
    {
        "id": "LAVAA_H2",
        "projectid": "LAVAA",
        "order": "H",
        "phase": "VI",
        "length": 2,
        "short_desc": "Refined color schemes for clarity and publication quality, optimized for colorblind accessibility.",
        "long_desc": "The visualization team refined the visual design for publication readiness. They adjusted color schemes to be aesthetically pleasing while maintaining colorblind accessibility. They optimized point sizing and transparency for overlapping data points. They created style presets for different use cases (journal submissions, presentations) ensuring consistent professional appearance."
    },
    {
        "id": "LAVAA_I0",
        "projectid": "LAVAA",
        "order": "I",
        "phase": "DI",
        "length": 1,
        "short_desc": "Compiled additional metadata: disease categories, meta-analysis results, and external annotations.",
        "long_desc": "The team expanded the data infrastructure to include disease category hierarchies and meta-analysis results from FinnGen consortia. They integrated external variant annotations showing whether variants were in credible causal sets. This richer metadata enabled more sophisticated filtering and analysis."
    },
    {
        "id": "LAVAA_J1",
        "projectid": "LAVAA",
        "order": "J",
        "phase": "VI",
        "length": 1,
        "short_desc": "Created visual designs for meta-analysis and variant comparison displays.",
        "long_desc": "The visualization team designed visual representations for comparing multiple variants' effects across phenotypes. They created matrix-style layouts showing meta-analysis results, implemented visual encodings for effect consistency across populations, and designed interaction patterns enabling easy variant comparison. These visualizations made complex multi-variant analyses accessible to users."
    },
    {
        "id": "LAVAA_J2",
        "projectid": "LAVAA",
        "order": "J",
        "phase": "DE",
        "length": 2,
        "short_desc": "Implemented advanced features, meta-analysis display, and variant comparison tools.",
        "long_desc": "The development team built meta-analysis visualization showing effect estimates across cohorts or populations. They created side-by-side comparison views allowing researchers to examine multiple variants simultaneously. They implemented advanced filtering interfaces and added export features for comparison plots."
    },
    {
        "id": "LAVAA_K0",
        "projectid": "LAVAA",
        "order": "K",
        "phase": "TE",
        "length": 1,
        "short_desc": "User testing on advanced features and manuscript preparation workflows.",
        "long_desc": "The team tested advanced features with geneticists preparing manuscripts, confirming that comparison tools and meta-analysis visualization effectively supported their analysis. Users validated that exported plots met journal quality standards. Feedback confirmed the tool's value for complex variant analysis and publication preparation."
    },
    {
        "id": "LAVAA_L1",
        "projectid": "LAVAA",
        "order": "L",
        "phase": "FU",
        "length": 1,
        "short_desc": "Added customizable styling and batch analysis capabilities.",
        "long_desc": "Based on user feedback, the team added features for customizing plot aesthetics (colors, fonts, sizes) and implemented batch processing allowing analysis of multiple variants or phenotype sets without manual re-filtering. These features improved efficiency for researchers analyzing large variant sets."
    },
    {
        "id": "LAVAA_L2",
        "projectid": "LAVAA",
        "order": "L",
        "phase": "VI",
        "length": 1,
        "short_desc": "Enhanced visualization documentation and created tutorial materials.",
        "long_desc": "The team created comprehensive documentation explaining volcano plot interpretation and LAVAA features. They produced tutorials showing how to prepare data, filter phenotypes, and export publication-ready figures. They created example galleries showing how different plot styles work for different analyses."
    },
    {
        "id": "LAVAA_M0",
        "projectid": "LAVAA",
        "order": "M",
        "phase": "DE",
        "length": 2,
        "short_desc": "Final optimization, server deployment, and documentation infrastructure.",
        "long_desc": "The development team optimized performance for large PheWAS datasets, ensuring smooth interaction even with thousands of associations. They deployed the tool to FinnGen servers with appropriate scaling. They built automated testing ensuring data updates wouldn't break the tool. They created API endpoints allowing programmatic tool access for batch processing."
    },
    {
        "id": "LAVAA_N1",
        "projectid": "LAVAA",
        "order": "N",
        "phase": "DI",
        "length": 1,
        "short_desc": "Gathered additional PheWAS datasets from collaborative studies.",
        "long_desc": "The team expanded available data by integrating PheWAS results from additional FinnGen analyses and collaborative studies. They prepared data from different disease domains allowing users to explore diverse phenotypes."
    },
    {
        "id": "LAVAA_N2",
        "projectid": "LAVAA",
        "order": "N",
        "phase": "UC",
        "length": 2,
        "short_desc": "Validated tool with bioinformaticians and manuscript reviewers.",
        "long_desc": "The team conducted testing with journal reviewers and bioinformaticians, confirming that LAVAA-generated visualizations met publication standards and effectively communicated variant pleiotropy. The tool gained recognition as improving PheWAS result interpretation and communication, leading to citations in published papers."
    },
    {
        "id": "LAVAA_O1",
        "projectid": "LAVAA",
        "order": "O",
        "phase": "FU",
        "length": 1,
        "short_desc": "Added customizable styling and batch analysis capabilities.",
        "long_desc": "Based on user feedback, the team added features for customizing plot aesthetics (colors, fonts, sizes) and implemented batch processing allowing analysis of multiple variants or phenotype sets without manual re-filtering. These features improved efficiency for researchers analyzing large variant sets."
    },
    {
        "id": "LAVAA_O2",
        "projectid": "LAVAA",
        "order": "O",
        "phase": "DE",
        "length": 2,
        "short_desc": "Implemented styling customization and batch processing systems.",
        "long_desc": "The development team built customizable style systems allowing researchers to adjust plots for specific journal requirements or presentation styles. They created batch processing pipelines for analyzing multiple variants or disease categories simultaneously, significantly improving workflow efficiency."
    },
    {
        "id": "LAVAA_P0",
        "projectid": "LAVAA",
        "order": "P",
        "phase": "TE",
        "length": 1,
        "short_desc": "Final testing and validation before publication.",
        "long_desc": "The team conducted comprehensive testing ensuring all features worked correctly and produced accurate results. They validated against known PheWAS results and confirmed publication outputs met scientific standards. The tool was released as a peer-reviewed paper demonstrating its value for genetic research."
    },
    {
        "id": "LAVAA_Q0",
        "projectid": "LAVAA",
        "order": "Q",
        "phase": "VI",
        "length": 2,
        "short_desc": "Created comprehensive visual documentation and example galleries.",
        "long_desc": "The visualization team created extensive documentation with screenshots showing how to use different features, gallery pages displaying example volcano plots from real analyses, and templates for common analysis patterns. This documentation helped new users quickly become productive with the tool."
    },
    {
        "id": "LAVAA_R0",
        "projectid": "LAVAA",
        "order": "R",
        "phase": "DE",
        "length": 2,
        "short_desc": "Implemented web hosting, API endpoints, and ongoing maintenance systems.",
        "long_desc": "The team set up production hosting on FinnGen infrastructure, created API endpoints for programmatic access, and established monitoring systems. They created data update pipelines allowing new PheWAS results to be added regularly. They built feedback systems allowing users to suggest improvements."
    },
    {
        "id": "LAVAA_S0",
        "projectid": "LAVAA",
        "order": "S",
        "phase": "TE",
        "length": 1,
        "short_desc": "Post-publication testing and user support.",
        "long_desc": "After publication, the team monitored tool usage and user feedback, addressing bugs and implementing requested features. The tool gained broad adoption in the genomics research community, becoming a standard tool for PheWAS visualization and enabling numerous research publications."
    },
    // ------------------- EB -------------------
    {
        "id": "EB_A1",
        "projectid": "EB",
        "order": "A",
        "phase": "PH",
        "length": 2,
        "short_desc": "Identified phenomenon: users struggle to understand endpoint relationships within hierarchical structures.",
        "long_desc": "Through stakeholder interviews with Risteys users and researchers, the team identified core challenges: endpoints were presented as isolated entities, users couldn't easily understand how endpoints related to each other, and the ICD-10 hierarchy wasn't visually apparent. The phenomenon to address was making phenotypic data exploration intuitive by revealing relationships within established medical taxonomies."
    },
    {
        "id": "EB_A2",
        "projectid": "EB",
        "order": "A",
        "phase": "UC",
        "length": 2,
        "short_desc": "Mapped diverse users: researchers exploring specific endpoints, scientists browsing phenotypes, clinicians.",
        "long_desc": "The team conducted interviews with Risteys users identifying distinct use cases: researchers investigating specific disease endpoints needing to understand related conditions, scientists conducting phenotype-wide studies needing comprehensive overviews, and clinicians wanting to understand which endpoints were clinically relevant. Each group had different navigation needs and information priorities."
    },
    {
        "id": "EB_B1",
        "projectid": "EB",
        "order": "B",
        "phase": "DI",
        "length": 1,
        "short_desc": "Analyzed endpoint characteristics: definitions, statistics, ICD-10 classification, relationships.",
        "long_desc": "The team examined FinnGen endpoint data including definitions, case counts, genome-wide significance hits, gender balance statistics, and ICD-10 classification codes. They identified the hierarchical structure showing how endpoints nested within disease categories. They analyzed relationships between endpoints (shared genetic factors, co-morbidity patterns) that could be visualized."
    },
    {
        "id": "EB_B2",
        "projectid": "EB",
        "order": "B",
        "phase": "FU",
        "length": 2,
        "short_desc": "Defined core functionalities: hierarchical browsing, endpoint comparison, statistics display.",
        "long_desc": "The team specified that the browser needed to display ICD-10 hierarchies with endpoints positioned within them, allow users to expand/collapse disease categories, show detailed endpoint statistics, enable side-by-side comparison of endpoints, and provide filtering and search. The interface needed to make relationships visually apparent while remaining performant with hundreds of endpoints."
    },
    {
        "id": "EB_C0",
        "projectid": "EB",
        "order": "C",
        "phase": "PH",
        "length": 1,
        "short_desc": "Refined phenomenon: enabling visual exploration of phenotypic data through hierarchical context.",
        "long_desc": "After initial analysis, the team refined their understanding: the core problem wasn't just presenting endpoints, but revealing how individual endpoints fit within larger patterns of health and disease. The solution would provide hierarchical context (ICD-10, FinnGen-specific groupings) showing each endpoint's position within medical taxonomy and allowing visual comparison of statistics across related endpoints."
    },
    {
        "id": "EB_D1",
        "projectid": "EB",
        "order": "D",
        "phase": "DI",
        "length": 1,
        "short_desc": "Compiled endpoint statistics and prepared hierarchical data structures.",
        "long_desc": "The team created optimized data structures representing ICD-10 hierarchy with nested endpoints. They compiled comprehensive endpoint statistics (case counts, gender distribution, significant hits) and created FinnGen-specific endpoint groupings. They prepared data in formats supporting efficient hierarchical queries and visualization."
    },
    {
        "id": "EB_D2",
        "projectid": "EB",
        "order": "D",
        "phase": "UC",
        "length": 1,
        "short_desc": "Conducted second round of user interviews on visualization preferences and interaction patterns.",
        "long_desc": "The team conducted deeper user interviews exploring how researchers preferred to navigate hierarchies, what statistics mattered most for decision-making, and which visual encodings felt intuitive. They tested early sketches to understand whether ICD-10 hierarchy versus FinnGen hierarchy was more useful as primary organization. User feedback shaped design decisions."
    },
    {
        "id": "EB_E0",
        "projectid": "EB",
        "order": "E",
        "phase": "VI",
        "length": 2,
        "short_desc": "Explored hierarchy visualization: treemaps, sunburst diagrams, interactive trees.",
        "long_desc": "The visualization team explored different approaches for displaying hierarchical data: treemaps showing endpoint sizes by case count, sunburst diagrams with concentric rings for hierarchy levels, and interactive tree layouts. They prototyped interactions: expanding/collapsing categories, highlighting related endpoints, and color-encoding statistics like genome-wide hits or gender balance. They tested readability at different hierarchy depths."
    },
    {
        "id": "EB_F0",
        "projectid": "EB",
        "order": "F",
        "phase": "DE",
        "length": 2,
        "short_desc": "Built initial prototype: hierarchy visualization and basic endpoint comparison.",
        "long_desc": "The development team constructed a working prototype using D3.js for hierarchical visualization. They implemented interactive tree navigation allowing expansion/collapse of disease categories. They created basic endpoint detail views and implemented selection mechanisms for comparing multiple endpoints. The prototype demonstrated the core concept but performance needed optimization for full dataset."
    },
    {
        "id": "EB_G1",
        "projectid": "EB",
        "order": "G",
        "phase": "FU",
        "length": 2,
        "short_desc": "Expanded functionality: advanced filtering, statistics comparison, and integration planning.",
        "long_desc": "Based on prototype exploration, the team specified additional functionality: filtering endpoints by statistics (minimum case count, genome-wide hits), comparing multiple endpoints side-by-side with visual difference highlighting, and detailed planning for eventual Risteys integration. They designed data interfaces supporting both standalone browsing and embedded components."
    },
    {
        "id": "EB_G2",
        "projectid": "EB",
        "order": "G",
        "phase": "TE",
        "length": 1,
        "short_desc": "Conducted prototype testing with Risteys users and FinnGen researchers.",
        "long_desc": "The team demonstrated the prototype to Risteys users and FinnGen researchers, gathering feedback on visualization clarity, interaction intuitiveness, and whether the hierarchical display was helpful. Users appreciated the hierarchical context but requested more sophisticated filtering and comparison tools. Feedback guided the development plan for full implementation."
    },
    {
        "id": "EB_H1",
        "projectid": "EB",
        "order": "H",
        "phase": "UC",
        "length": 1,
        "short_desc": "Refined use cases based on prototype testing and real-world workflow observation.",
        "long_desc": "The team observed researchers using the prototype on realistic tasks and refined their understanding of use cases. They identified common workflows: browsing disease categories to find relevant endpoints, comparing statistics across related conditions, and jumping between related endpoints. These observations informed prioritization of features for full development."
    },
    {
        "id": "EB_H2",
        "projectid": "EB",
        "order": "H",
        "phase": "FU",
        "length": 1,
        "short_desc": "Prioritized features for full development based on user research.",
        "long_desc": "The team created a prioritized feature list emphasizing: efficient hierarchical navigation, powerful filtering by multiple statistics, detailed endpoint comparison with visual difference highlighting, and search capabilities. They planned phased development addressing high-priority features first while maintaining flexibility for ongoing refinement."
    },
    {
        "id": "EB_I1",
        "projectid": "EB",
        "order": "I",
        "phase": "DI",
        "length": 1,
        "short_desc": "Expanded data infrastructure: additional FinnGen hierarchies and metadata.",
        "long_desc": "The team expanded the data layer to support multiple hierarchies (ICD-10, FinnGen-specific groupings, phenotype domains). They added additional metadata including endpoint definitions, data quality metrics, and relationship information. They optimized database queries to support efficient filtering and searching across large endpoint sets."
    },
    {
        "id": "EB_I2",
        "projectid": "EB",
        "order": "I",
        "phase": "VI",
        "length": 2,
        "short_desc": "Refined visual design: color schemes, typography, visual hierarchy clarity.",
        "long_desc": "The visualization team refined the overall aesthetic to match FinnGen's design language. They created color encoding for different endpoint categories and statistics visualization (case counts, gender balance, meta-analysis results). They improved visual hierarchy clarity through typography and spacing, making it easy to scan hierarchies and identify important information. They ensured accessibility through colorblind-friendly palettes."
    },
    {
        "id": "EB_J0",
        "projectid": "EB",
        "order": "J",
        "phase": "DE",
        "length": 2,
        "short_desc": "Developed full browser with filtering, comparison tools, and performance optimization.",
        "long_desc": "The development team built the full Endpoint Browser with comprehensive hierarchy visualization, advanced filtering interfaces, and side-by-side endpoint comparison views. They implemented search functionality and created efficient data loading to handle the full FinnGen endpoint dataset without lag. They built APIs supporting eventual integration with Risteys."
    },
    {
        "id": "EB_K1",
        "projectid": "EB",
        "order": "K",
        "phase": "DI",
        "length": 1,
        "short_desc": "Gathered additional FinnGen data: recent analyses and updated endpoint definitions.",
        "long_desc": "The team integrated newly completed FinnGen analyses, updated endpoint definitions reflecting recent changes, and added meta-analysis results from collaborative studies. This ensured the browser always presented current information."
    },
    {
        "id": "EB_K2",
        "projectid": "EB",
        "order": "K",
        "phase": "FU",
        "length": 2,
        "short_desc": "Added visualization customization and export capabilities for research publications.",
        "long_desc": "Based on ongoing user feedback, the team added features allowing users to customize comparison visualizations and export them for presentations or publications. They implemented preset views for common analyses and created options for adjusting color schemes and statistical displays to match user preferences."
    },
    {
        "id": "EB_L0",
        "projectid": "EB",
        "order": "L",
        "phase": "UC",
        "length": 1,
        "short_desc": "Conducted extended user testing validating functionality and identifying remaining needs.",
        "long_desc": "The team conducted extensive testing with diverse users—researchers, clinicians, data analysts—using the browser on real research questions. Testing validated that the hierarchical browser effectively supported phenotypic data exploration and that users could accomplish common tasks efficiently. Feedback identified minor refinements and future feature possibilities."
    },
    {
        "id": "EB_M0",
        "projectid": "EB",
        "order": "M",
        "phase": "FU",
        "length": 1,
        "short_desc": "Defined path to Risteys integration and scoped component architecture.",
        "long_desc": "The team defined the technical approach for integrating the Endpoint Browser into Risteys as a component. They designed the component API and data interfaces ensuring the browser could function both standalone and embedded. They planned migration strategy to eventually make the browser the primary endpoint exploration interface in Risteys."
    },
    {
        "id": "EB_N0",
        "projectid": "EB",
        "order": "N",
        "phase": "VI",
        "length": 2,
        "short_desc": "Created comprehensive documentation and educational materials.",
        "long_desc": "The visualization team created extensive documentation with screenshots, tutorials showing how to navigate hierarchies and compare endpoints, and example analyses. They created video tutorials demonstrating key workflows. These materials helped users quickly become proficient with the browser's capabilities."
    },
    {
        "id": "EB_O0",
        "projectid": "EB",
        "order": "O",
        "phase": "DE",
        "length": 3,
        "short_desc": "Full production development: scalability, data updates, and Risteys integration planning.",
        "long_desc": "The development team built production infrastructure supporting large-scale deployment. They created automated data update pipelines ensuring the browser always reflected current FinnGen results. They implemented scalable server architecture handling concurrent users. They built tools supporting eventual Risteys integration and created API endpoints for programmatic access."
    },
    {
        "id": "EB_P0",
        "projectid": "EB",
        "order": "P",
        "phase": "TE",
        "length": 1,
        "short_desc": "Comprehensive testing: performance, data accuracy, accessibility, and user workflows.",
        "long_desc": "The team conducted thorough testing ensuring the browser performed smoothly with full FinnGen data, that displayed statistics were accurate, and that accessibility standards were met. They tested on real user workflows and created quality assurance procedures for data updates. The browser was cleared for public release."
    },
    {
        "id": "EB_Q1",
        "projectid": "EB",
        "order": "Q",
        "phase": "DI",
        "length": 1,
        "short_desc": "Prepared integration data and Risteys API specifications.",
        "long_desc": "The team prepared FinnGen data in formats suitable for Risteys integration, defined data APIs for component communication, and created specification documents for the Risteys team. They prepared test data supporting integration development."
    },
    {
        "id": "EB_Q2",
        "projectid": "EB",
        "order": "Q",
        "phase": "FU",
        "length": 1,
        "short_desc": "Added features supporting Risteys integration: responsive design, embedded modes.",
        "long_desc": "The team implemented responsive design ensuring the browser functioned on various screen sizes and devices. They created embedded modes allowing the browser to work within Risteys' layout. They added features supporting deep linking to specific endpoints in Risteys."
    },
    {
        "id": "EB_R0",
        "projectid": "EB",
        "order": "R",
        "phase": "VI",
        "length": 1,
        "short_desc": "Finalized visual design for Risteys integration context.",
        "long_desc": "The visualization team ensured the browser's design would integrate seamlessly with Risteys' aesthetic while maintaining usability. They created color schemes coordinating with Risteys' design language and ensured visual consistency across integrated views."
    },
    {
        "id": "EB_S0",
        "projectid": "EB",
        "order": "S",
        "phase": "DE",
        "length": 2,
        "short_desc": "Implemented Risteys integration and created embedded component versions.",
        "long_desc": "The development team integrated the Endpoint Browser into Risteys, implementing the component architecture and API communication. They created embedded versions fitting within Risteys layouts. They built deployment infrastructure supporting both tools and coordinated data updates across systems."
    },
    {
        "id": "EB_T1",
        "projectid": "EB",
        "order": "T",
        "phase": "PH",
        "length": 1,
        "short_desc": "Reassessed core phenomenon with Risteys integration feedback.",
        "long_desc": "With the browser now integrated into Risteys and in active use, the team reflected on whether the core phenomenon was being effectively addressed. Feedback showed that the hierarchical approach successfully made endpoint relationships intuitive, validating the original insight. However, new opportunities for improvement emerged."
    },
    {
        "id": "EB_T2",
        "projectid": "EB",
        "order": "T",
        "phase": "UC",
        "length": 1,
        "short_desc": "Gathered feedback on integrated experience and identified future use cases.",
        "long_desc": "The team collected feedback from Risteys users experiencing the integrated browser. They identified new use cases: researchers comparing endpoints across multiple disease categories, clinicians navigating to clinically relevant endpoints, and educators using the browser for teaching phenotypic data concepts. This feedback guided planning for ongoing improvements."
    },
    {
        "id": "EB_U0",
        "projectid": "EB",
        "order": "U",
        "phase": "FU",
        "length": 2,
        "short_desc": "Planned advanced features: cross-phenotype analysis, recommendation systems, integration with analyses.",
        "long_desc": "Based on user feedback and emerging use cases, the team planned advanced features for future releases: tools for analyzing patterns across multiple endpoints, recommendation systems suggesting related endpoints, and integration with FinnGen analysis tools. These features would deepen the browser's analytical capabilities."
    },
    {
        "id": "EB_V0",
        "projectid": "EB",
        "order": "V",
        "phase": "DE",
        "length": 2,
        "short_desc": "Developed advanced features: cross-phenotype analysis and recommendation engine.",
        "long_desc": "The development team built tools supporting analysis across multiple endpoints simultaneously, identifying shared genetic factors and co-morbidity patterns. They created a recommendation engine suggesting endpoints related to a user's current focus based on genetic and phenotypic similarity."
    },
    {
        "id": "EB_W0",
        "projectid": "EB",
        "order": "W",
        "phase": "VI",
        "length": 1,
        "short_desc": "Designed visualizations for cross-phenotype relationships and endpoint recommendations.",
        "long_desc": "The visualization team created clear visual representations of relationships between endpoints: network diagrams showing genetic correlation structures, similarity matrices showing phenotypic overlap, and recommendation panels highlighting suggested endpoints with relationship explanations."
    },
    {
        "id": "EB_X0",
        "projectid": "EB",
        "order": "X",
        "phase": "DE",
        "length": 1,
        "short_desc": "Final optimization and deployment of advanced features.",
        "long_desc": "The team optimized the network analysis and recommendation algorithms for performance, deployed the advanced features to production, and ensured data freshness for the recommendation engine. They created monitoring systems tracking feature usage and user satisfaction."
    },
    {
        "id": "EB_Y0",
        "projectid": "EB",
        "order": "Y",
        "phase": "TE",
        "length": 1,
        "short_desc": "Ongoing testing and user feedback collection for continuous improvement.",
        "long_desc": "The team established ongoing testing and feedback collection processes to guide future development. As the browser remains under active development, they collect regular user feedback, monitor usage patterns, and plan improvements. The work-in-progress nature ensures the tool evolves to meet emerging research needs."
    }
]

export default nodes
