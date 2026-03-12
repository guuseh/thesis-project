const edges = [
    {
        "source": "",
        "target": "",
        "short_desc": "",
        "long_desc": ""
    },
    // ------------------- LINES OF DESCENT -------------------
    // INTERNAL
    {
        "source": "LOD_A1",
        "target": "LOD_B0",
        "short_desc": "Phenomenon definition enabled task specification for cellular automata simulation.",
        "long_desc": "Once the team defined the genetic bottleneck phenomenon as the focus, they could specify what the tool needed to do: simulate populations, track genetic mutations through color representation, and demonstrate how diversity decreases with bottlenecks. The phenomenon understanding directly informed the required functionalities."
    },
    {
        "source": "LOD_A2",
        "target": "LOD_B0",
        "short_desc": "Use case understanding shaped which core tasks the tool must support.",
        "long_desc": "Understanding that the tool would serve both specialists and general readers of Nature required functionalities that balanced scientific accuracy with intuitive interaction. The diverse user needs led to prioritizing manual generation addition, clear visual feedback, and publication-quality aesthetics as core requirements."
    },
    {
        "source": "LOD_B0",
        "target": "LOD_C0",
        "short_desc": "Defined functionalities guided visualization design for genetic representation.",
        "long_desc": "The requirement to show color-based genetic inheritance directly shaped the visualization exploration: the team needed to determine how colors would encode mutations, how grid layouts would show generations, and how to make clustering patterns visually apparent as bottlenecks occurred."
    },
    {
        "source": "LOD_B0",
        "target": "LOD_D2",
        "short_desc": "Functionalities requirements specified what data structure would be needed.",
        "long_desc": "To implement cellular automata with mutation tracking, the team needed to define the data model: individual-level genetic states, inheritance rules with mutation probabilities, and structures supporting population splitting. The functionalities specification directly informed the data requirements."
    },
    {
        "source": "LOD_C0",
        "target": "LOD_D2",
        "short_desc": "Visualization exploration revealed additional data requirements for mutation tracking.",
        "long_desc": "Through visualization design, the team discovered they needed more sophisticated data tracking to support animated transitions and smooth color changes. This feedback from visualization work led to refining the data structures to support efficient rendering of genetic state changes."
    },
    {
        "source": "LOD_C0",
        "target": "LOD_D3",
        "short_desc": "Visualization design for branching patterns enabled new population functionalities.",
        "long_desc": "The visualization exploration included testing how to display population branches visually. This investigation revealed the technical feasibility and visual clarity of branch representations, leading to the decision to add population branching as a core functionality, requiring new interaction patterns and computational logic."
    },
    {
        "source": "LOD_D1",
        "target": "LOD_E1",
        "short_desc": "Refined phenomenon understanding enabled more nuanced visualization of genetic drift.",
        "long_desc": "After realizing the cellular automata approach revealed genetic drift effects not originally emphasized, the team returned to visualization with a focus on showing random variation and unpredictability. This led to design choices emphasizing the stochastic nature of bottleneck effects through color variation patterns."
    },
    {
        "source": "LOD_D2",
        "target": "LOD_E2",
        "short_desc": "Data specifications allowed development of the core simulation engine.",
        "long_desc": "With data structures defined, the development team could build the cellular automata engine implementing the genetic inheritance rules and mutation logic. The data specifications provided the blueprint for algorithm development."
    },
    {
        "source": "LOD_D3",
        "target": "LOD_E1",
        "short_desc": "Branching functionalities required visualization refinement for clarity.",
        "long_desc": "The decision to support population branching required visualization work to clearly show relationships between branches and their divergent evolution. The functionality addition directly drove visualization refinement."
    },
    {
        "source": "LOD_D3",
        "target": "LOD_E2",
        "short_desc": "Population splitting functionality required development of branch tracking system.",
        "long_desc": "Implementing the branching functionality required building data structures and algorithms to manage multiple population lineages simultaneously. The new functionality specification directly informed development priorities."
    },
    {
        "source": "LOD_E2",
        "target": "LOD_F0",
        "short_desc": "Successful development of core simulation enabled addition of analytics features.",
        "long_desc": "Once the cellular automata simulation and branching system were working, the team could confidently add analytical features on top. The working simulation provided a foundation for calculating and displaying genetic diversity metrics."
    },
    {
        "source": "LOD_F0",
        "target": "LOD_G1",
        "short_desc": "Analytics functionalities required compilation of genetic reference datasets.",
        "long_desc": "To implement diversity metric calculations and validation, the team needed to gather population genetic datasets and bottleneck case studies. The expanded functionalities directly drove the need for additional data collection."
    },
    {
        "source": "LOD_F0",
        "target": "LOD_G2",
        "short_desc": "Analytics features required validation of use cases with geneticists.",
        "long_desc": "The addition of diversity metrics and population-level statistics required confirmation that these features actually served researcher needs. The team conducted validation sessions to ensure the expanded tool still met its intended use cases."
    },
    {
        "source": "LOD_G1",
        "target": "LOD_H0",
        "short_desc": "Genetic reference data enabled implementation of analytics display.",
        "long_desc": "With validation datasets and bottleneck case studies compiled, the development team could implement the display of diversity metrics, calculate allele frequencies accurately, and verify that calculations matched expected biological behavior."
    },
    {
        "source": "LOD_G2",
        "target": "LOD_H0",
        "short_desc": "Validated use cases confirmed analytics features were worth developing.",
        "long_desc": "User validation confirmed that geneticists valued the diversity metrics and population-level statistics. This validation justified the significant development effort required to implement these analytics features, and the team prioritized these features in the development roadmap."
    },
    {
        "source": "LOD_H0",
        "target": "LOD_I0",
        "short_desc": "Production development completed necessitated visualization refinement for publication.",
        "long_desc": "With the analytics features developed and integrated, the visualization team refocused on final aesthetic refinement. The complete feature set required visual polish to work at Nature cover publication quality."
    },
    {
        "source": "LOD_I0",
        "target": "LOD_J0",
        "short_desc": "Visual refinement completed triggered final code optimization and hardening.",
        "long_desc": "Once visualization design was finalized, the development team conducted code optimization and cross-browser testing. The feature-complete state made this the appropriate time for performance optimization and compatibility hardening."
    },
    {
        "source": "LOD_J0",
        "target": "LOD_K0",
        "short_desc": "Optimized code ready for internal testing with collaborators.",
        "long_desc": "With performance optimized and browsers tested, the tool was ready for comprehensive internal testing with FinnGen geneticists to validate biological accuracy and usability."
    },
    {
        "source": "LOD_K0",
        "target": "LOD_L1",
        "short_desc": "Testing feedback identified need for supplementary educational materials.",
        "long_desc": "Internal testing revealed that users would benefit from additional genetic reference materials showing real-world applications of the bottleneck concepts. This led to data collection efforts for supplementary materials."
    },
    {
        "source": "LOD_K0",
        "target": "LOD_L2",
        "short_desc": "Testing validated functionality and revealed extended use case potential.",
        "long_desc": "Testing with geneticists confirmed core functionality worked well and identified additional use cases beyond the Nature cover: classroom teaching, research exploration, and public engagement. These insights informed planning for educational features."
    },
    {
        "source": "LOD_L1",
        "target": "LOD_M2",
        "short_desc": "Supplementary genetic datasets enabled development of preset scenarios.",
        "long_desc": "With additional genetic reference data collected, the development team could build presets allowing users to explore documented bottleneck cases. The data collection directly enabled this feature development."
    },
    {
        "source": "LOD_L2",
        "target": "LOD_M1",
        "short_desc": "Identified educational use cases specified new preset and documentation features.",
        "long_desc": "Recognition of educational use cases drove functionality additions: preset scenarios for famous bottlenecks, tutorial modes, and in-app documentation. These features were prioritized based on the expanded use case understanding."
    },
    {
        "source": "LOD_L2",
        "target": "LOD_M2",
        "short_desc": "Extended use cases informed development priorities for educational features.",
        "long_desc": "Understanding that users wanted to learn from and teach with the tool influenced development priorities. Educational features were promoted to core functionality rather than optional additions."
    },
    {
        "source": "LOD_M1",
        "target": "LOD_N0",
        "short_desc": "Educational functionality implementation required visualization tutorial design.",
        "long_desc": "Once presets and documentation were implemented, the visualization team created step-by-step visual guides and educational infographics explaining genetic concepts. The educational features required specialized visualization design."
    },
    {
        "source": "LOD_M2",
        "target": "LOD_N0",
        "short_desc": "Educational development completed required visual communication design.",
        "long_desc": "With presets deployed and tutorials in the codebase, the visualization team focused on making educational materials visually clear and engaging for diverse learner backgrounds."
    },
    {
        "source": "LOD_N0",
        "target": "LOD_O0",
        "short_desc": "Educational materials finalized enabled deployment infrastructure setup.",
        "long_desc": "With visualization complete, the focus shifted to infrastructure: setting up Aalto servers, configuring analytics, creating web pages, and establishing maintenance procedures for the deployed tool."
    },
    {
        "source": "LOD_O0",
        "target": "LOD_P0",
        "short_desc": "Deployed infrastructure allowed external testing with educators and public.",
        "long_desc": "With the tool deployed to accessible servers, external testing could begin. Educators and public users provided feedback on the real-world usability and educational effectiveness of the complete tool."
    },
    // EXTERNAL
    {
        "source": "LOD_C0",
        "target": "WIFG_C2",
        "short_desc": "LOD's genetic visualization design informed WIFG's scrollytelling approach.",
        "long_desc": "The techniques developed for visualizing genetic patterns and population changes in LOD directly informed how WIFG would present FinnGen's data transformation journey. Progressive revelation and visual encoding strategies were adapted from LOD's work."
    },
    {
        "source": "LOD_N0",
        "target": "WIFG_I2",
        "short_desc": "LOD's educational visualization design influenced WIFG's interactive tool creation.",
        "long_desc": "LOD's successful tutorial materials and step-by-step visual guides informed how WIFG would design its health explorer and research browser. Both teams adopted similar principles for making complex genetic concepts accessible."
    },
    {
        "source": "LOD_L2",
        "target": "WIFG_F2",
        "short_desc": "LOD's discovered educational use cases informed WIFG's interactive feature planning.",
        "long_desc": "When LOD team discovered the tool's value for education and public engagement, this insight directly influenced WIFG's decision to prioritize interactive features that would enable citizens to actively explore FinnGen data rather than passively view information."
    },
        {
        "source": "LOD_D3",
        "target": "LAVAA_H1",
        "short_desc": "LOD's population branching concept inspired LAVAA's variant comparison features.",
        "long_desc": "The approach LOD used to show multiple diverging population paths influenced LAVAA's design of side-by-side variant comparison tools. Both tools needed to show how multiple related entities behaved differently under different conditions."
    },
        {
        "source": "LOD_I0",
        "target": "EB_E0",
        "short_desc": "LOD's interactive visualization techniques informed EB's hierarchical exploration design.",
        "long_desc": "The interactive zoom, filtering, and progressive detail revelation techniques developed for LOD influenced how EB would design its hierarchical endpoint browser. Both tools needed to make complex multi-level data navigable."
    },
    {
        "source": "LOD_P0",
        "target": "EB_G2",
        "short_desc": "LOD's external testing success informed EB's test user recruitment strategy.",
        "long_desc": "LOD's successful external testing with educators and the general public demonstrated the value of diverse test audiences. This influenced EB to conduct testing with not just researchers but also clinicians and diverse user backgrounds."
    },
    // ------------------- WHAT IS FINNGEN --------------------
    // INTERNAL
    {
        "source": "WIFG_A0",
        "target": "WIFG_B1",
        "short_desc": "Mapped user groups informed phenomenon definition for FinnGen mission communication.",
        "long_desc": "Understanding diverse user groups (citizens, researchers, clinicians) shaped how the team framed the core phenomenon: not just 'what is FinnGen,' but 'why it matters to you.' Each user group's perspective informed the phenomenon definition."
    },
    {
        "source": "WIFG_A0",
        "target": "WIFG_B2",
        "short_desc": "Use case understanding directly specified required functionalities.",
        "long_desc": "Different users (public citizens, researchers, providers) needed different information paths. This drove functionality requirements: narrative journey for public, detailed research information for scientists, clinical impact for providers. Multiple functionalities emerged from use case analysis."
    },
    {
        "source": "WIFG_B1",
        "target": "WIFG_C1",
        "short_desc": "Phenomenon framing specified what data was needed to communicate the message.",
        "long_desc": "To communicate 'why FinnGen matters,' the team needed specific types of data: participant numbers showing participation scale, health impacts showing real outcomes, citizen stories showing human motivation. The phenomenon understanding directly determined data requirements."
    },
    {
        "source": "WIFG_B1",
        "target": "WIFG_C2",
        "short_desc": "Phenomenon understanding informed visualization strategy for engagement.",
        "long_desc": "The decision to focus on trust and participation in the phenomenon definition led to visualization strategies emphasizing transparency (showing data flows), citizen inclusion (featuring stories), and clear health impacts. The phenomenon guided visual language choices."
    },
    {
        "source": "WIFG_B2",
        "target": "WIFG_C1",
        "short_desc": "Specified functionalities required diverse data sources for implementation.",
        "long_desc": "Features like an interactive data journey and impact demonstrations needed specific data: statistics, research findings, health registry information. Functionality specifications directly determined what data the team needed to gather."
    },
    {
        "source": "WIFG_B2",
        "target": "WIFG_C2",
        "short_desc": "Multiple functionalities informed visualization design choices and interactions.",
        "long_desc": "The planned functionalities (narrative progression, interactive exploration, impact demonstration) required specific visualization approaches: scrollytelling for narrative, interactive elements for exploration, compelling graphics for impact demonstration."
    },
    {
        "source": "WIFG_C1",
        "target": "WIFG_D0",
        "short_desc": "Data specifications and visualization strategy together informed development requirements.",
        "long_desc": "With data gathered and visualization approach designed, the development team understood what needed to be built: a scrollytelling website that integrated diverse data sources and implemented interactive progression."
    },
    {
        "source": "WIFG_C2",
        "target": "WIFG_D0",
        "short_desc": "Visualization design and prepared data sources enabled development implementation.",
        "long_desc": "The visualization designs and data sources provided the blueprint for development: the team knew what visual effects to implement, what data to integrate, and what user interactions to enable."
    },
    {
        "source": "WIFG_D0",
        "target": "WIFG_E0",
        "short_desc": "Completed website required internal testing for accuracy and messaging.",
        "long_desc": "With the website built, internal testing ensured that the scroll-triggered content accurately presented FinnGen's mission and didn't contain errors. Leadership and communications teams validated scientific accuracy and appropriate messaging."
    },
    {
        "source": "WIFG_E0",
        "target": "WIFG_F1",
        "short_desc": "Internal testing feedback drove expansion of data coverage.",
        "long_desc": "Testing revealed that the initial data scope was too narrow. Feedback indicated users wanted more examples of health conditions and research outcomes. This drove expansion of data collection efforts."
    },
    {
        "source": "WIFG_E0",
        "target": "WIFG_F2",
        "short_desc": "Testing revealed need for interactive features to increase engagement.",
        "long_desc": "Testers suggested that scrollytelling alone might not fully engage all audiences. Feedback about desired interactivity led to planning for health explorers and research browsers that would let users actively engage with data."
    },
    {
        "source": "WIFG_F2",
        "target": "WIFG_G0",
        "short_desc": "Designed interactive tools required visual refinement for consistency.",
        "long_desc": "Once the interactive tools (health explorer, research browser) were specified, the visualization team refined their design to maintain visual consistency with the scrollytelling site. Icons, colors, and layouts were designed to create a cohesive experience."
    },
    {
        "source": "WIFG_G0",
        "target": "WIFG_H0",
        "short_desc": "Visual design finalized enabled development of interactive components.",
        "long_desc": "With the visual design established for the new tools, the development team could build the health condition explorer, research browser, and participation guide with consistent aesthetics and intuitive interactions."
    },
    {
        "source": "WIFG_H0",
        "target": "WIFG_I1",
        "short_desc": "Developed interactive tools required validation of use cases with real users.",
        "long_desc": "Now that interactive features were developed, the team needed to validate they actually supported intended uses. Testing with citizens and healthcare providers confirmed the tools met their needs."
    },
    {
        "source": "WIFG_H0",
        "target": "WIFG_I2",
        "short_desc": "Interactive implementation required visualization refinement and accessibility work.",
        "long_desc": "With interactive tools built, the visualization team created tutorials and accessibility features. Hover states, icons, and help systems were refined based on how users actually interacted with the tools."
    },
    {
        "source": "WIFG_I1",
        "target": "WIFG_J0",
        "short_desc": "Validated use cases confirmed tools were ready for external testing.",
        "long_desc": "User validation of the interactive tools' functionality provided confidence that they were ready for broader external testing. The team proceeded to public beta testing based on positive validation results."
    },
    {
        "source": "WIFG_I2",
        "target": "WIFG_J0",
        "short_desc": "Completed visualization refinement indicated readiness for external testing.",
        "long_desc": "With accessibility features complete and tutorials finalized, the website was ready for external testing. The visualization work enabled public beta launch."
    },
    {
        "source": "WIFG_J0",
        "target": "WIFG_K0",
        "short_desc": "Successful external testing validated site readiness for production deployment.",
        "long_desc": "Positive feedback from public testers confirmed the website effectively communicated FinnGen's message and engaged users. This validation led to optimizing for production deployment and multilingual support."
    },
    {
        "source": "WIFG_K0",
        "target": "WIFG_L0",
        "short_desc": "Production deployment completed enabled monitoring of public usage patterns.",
        "long_desc": "With the site live and optimized, monitoring systems tracked user engagement, identified which content resonated most, and revealed where users encountered difficulties. This data guided future improvements."
    },
    // EXTERNAL
    {
        "source": "WIFG_I2",
        "target": "V3C_N2",
        "short_desc": "WIFG's accessibility and help system approach informed V3C's documentation strategy.",
        "long_desc": "WIFG's successful creation of accessible help systems and intuitive documentation informed V3C's approach to implementing contextual help and video tutorials. Both teams prioritized making complex interfaces self-explanatory."
    },
    {
        "source": "WIFG_D0",
        "target": "LAVAA_D2",
        "short_desc": "WIFG's scrollytelling approach inspired LAVAA's progressive feature implementation.",
        "long_desc": "WIFG's success with progressive information revelation through scrollytelling influenced how LAVAA would implement its development: starting with core functionality, then progressively adding filtering, comparison, and batch processing features."
    },
    // ------------------- V3C -------------------
    // INTERNAL
    {
        "source": "V3C_A1",
        "target": "V3C_B1",
        "short_desc": "Understanding data challenges informed the core phenomenon focus.",
        "long_desc": "The analysis of variant calling data characteristics and rare variant problems directly shaped the phenomenon definition: rare variants are too valuable to discard despite calling difficulties. The data analysis revealed the specific problem the tool would address."
    },
    {
        "source": "V3C_A2",
        "target": "V3C_B1",
        "short_desc": "Specified functionalities confirmed the core problem worth solving.",
        "long_desc": "Once the team defined that the tool needed to enable manual quality assessment and correction, they validated that this was indeed the phenomenon needing addressal: rare variant calling quality was the bottleneck preventing data use."
    },
    {
        "source": "V3C_A2",
        "target": "V3C_B2",
        "short_desc": "Functional specifications expanded understanding of variant calling challenges.",
        "long_desc": "Designing interfaces for cluster visualization and manual input required deeper understanding of the variant calling process. This functional design work revealed additional complexities in rare variant genetics that informed the phenomenon understanding."
    },
    {
        "source": "V3C_B1",
        "target": "V3C_C1",
        "short_desc": "Confirmed phenomenon focus directed visualization of cluster plots.",
        "long_desc": "Understanding that rare variant quality was the core issue, the visualization team focused on designing cluster plot displays that made visual assessment as clear and reliable as possible for expert geneticists."
    },
    {
        "source": "V3C_B1",
        "target": "V3C_C2",
        "short_desc": "Phenomenon understanding informed visualization exploration for expert use.",
        "long_desc": "The focus on expert users enabled visualization choices optimizing for skilled genetics researchers: dense information displays, advanced filtering options, and efficient interaction patterns replaced broader accessibility concerns."
    },
    {
        "source": "V3C_B2",
        "target": "V3C_C1",
        "short_desc": "Specified use case needs directed cluster visualization design priorities.",
        "long_desc": "Understanding that skilled geneticists would visually assess clusters informed visualization priorities: clarity at the decision boundary between genotypes, efficient zoom/pan, and color choices supporting expert pattern recognition."
    },
    {
        "source": "V3C_B2",
        "target": "V3C_C2",
        "short_desc": "Use case understanding confirmed visualization focus on expert efficiency.",
        "long_desc": "Expert users needed fast workflow—correcting many variants efficiently. This use case understanding drove visualization design emphasizing quick visual assessment and rapid input rather than pedagogical clarity or broad accessibility."
    },
    {
        "source": "V3C_C1",
        "target": "V3C_D2",
        "short_desc": "Visualization design identified specific data structure requirements.",
        "long_desc": "To display cluster plots efficiently and support zoom/filter operations, the team needed specific data structures. Visualization exploration revealed what data formats would enable responsive interaction."
    },
    {
        "source": "V3C_C1",
        "target": "V3C_D3",
        "short_desc": "Cluster visualization design informed functionality for variant filtering.",
        "long_desc": "The visualization work revealed that researchers needed to efficiently navigate large variant lists. This led to functionality specifications for filtering by variant characteristics, enabling researchers to prioritize high-impact rare variants for correction."
    },
    {
        "source": "V3C_C2",
        "target": "V3C_D1",
        "short_desc": "Visualizations informed data preparation for rapid cluster rendering.",
        "long_desc": "To display cluster plots with immediate responsiveness, data preparation and data structures needed optimization. The visualization design work specified data formats enabling fast rendering without lag."
    },
    {
        "source": "V3C_C2",
        "target": "V3C_D2",
        "short_desc": "Visualization design informed data specification for filtering capability.",
        "long_desc": "To enable the visualization filtering operations, the team needed metadata fields and indexed data structures. Visualization design directly drove data requirements."
    },
    {
        "source": "V3C_C2",
        "target": "V3C_D3",
        "short_desc": "Visualization exploration revealed need for batch processing functionality.",
        "long_desc": "Testing cluster plot interactions revealed that researchers would process many variants in sequence. This drove functionality addition: batch processing to efficiently correct and export multiple variant calls."
    },
    {
        "source": "V3C_D1",
        "target": "V3C_E0",
        "short_desc": "Optimized data enabled efficient cluster visualization engine development.",
        "long_desc": "With data optimized for rapid access, the development team built responsive cluster rendering. Efficient data structures enabled the interactive zoom and pan required for assessing subtle cluster boundaries."
    },
    {
        "source": "V3C_D2",
        "target": "V3C_E0",
        "short_desc": "Data specifications with filtering metadata enabled tool implementation.",
        "long_desc": "The data structures and metadata enabled building the complete variant calling correction tool with filtering, manual input, and batch processing capabilities."
    },
    {
        "source": "V3C_D3",
        "target": "V3C_E0",
        "short_desc": "Batch processing specifications informed development architecture.",
        "long_desc": "Requirements for processing multiple variants efficiently informed development architecture: data structures supporting batch operations, UI patterns for bulk selection, and export formats for result collection."
    },
    {
        "source": "V3C_E0",
        "target": "V3C_F1",
        "short_desc": "Testing revealed additional impact beyond the original phenomenon.",
        "long_desc": "User testing showed the tool's value extended beyond recovering rare variants—it improved understanding of calling confidence. This validated the core phenomenon while expanding its scope."
    },
        {
        "source": "V3C_E0",
        "target": "V3C_F2",
        "short_desc": "Successful testing confirmed validation datasets were necessary.",
        "long_desc": "Testing's success indicated that quantitative validation would strengthen the tool. The team gathered validation datasets with known genotypes to measure and demonstrate quality improvements."
    },
  {
        "source": "V3C_F1",
        "target": "V3C_G1",
        "short_desc": "Refined phenomenon understanding guided planning of new functionality.",
        "long_desc": "Understanding that quality assessment was central to the tool's value informed specification of confidence scoring mechanisms that would quantify calling reliability."
    },
    {
        "source": "V3C_F1",
        "target": "V3C_G2",
        "short_desc": "Refined phenomenon informed visualization of quality indicators.",
        "long_desc": "The expanded phenomenon understanding guided visualization design for confidence ratings and quality metrics, making these new capabilities visually prominent and intuitive."
    },
    {
        "source": "V3C_F2",
        "target": "V3C_G1",
        "short_desc": "Validation datasets enabled specification of confidence scoring features.",
        "long_desc": "With validation data available showing known correct genotypes, the team could specify confidence scoring mechanisms that would compare manual calls against these standards."
    },
    {
        "source": "V3C_G1",
        "target": "V3C_H0",
        "short_desc": "Specified confidence features required user validation before development.",
        "long_desc": "Before investing in development, the team demonstrated planned confidence scoring features to FinnGen geneticists to confirm these additions would be valuable and usable during high-volume correction work."
    },
    {
        "source": "V3C_G2",
        "target": "V3C_H0",
        "short_desc": "Visual designs for confidence metrics needed user feedback for refinement.",
        "long_desc": "The visualization team showed proposed confidence visualizations to users, gathering feedback on whether the visual representations were intuitive and whether color coding and layouts were appropriate for expert users."
    },
    {
        "source": "V3C_H0",
        "target": "V3C_I1",
        "short_desc": "User validation confirmed need for comprehensive validation data infrastructure.",
        "long_desc": "User feedback confirmed confidence scoring was valuable, so the team prepared comprehensive validation datasets and quality benchmarks that would enable accurate scoring and quality assessment."
    },
    {
        "source": "V3C_H0",
        "target": "V3C_I2",
        "short_desc": "Validated features justified starting development of confidence system.",
        "long_desc": "User confirmation that confidence scoring was needed gave the go-ahead for development of the confidence mechanism, quality algorithms, and flagging systems."
    },
    {
        "source": "V3C_I1",
        "target": "V3C_J0",
        "short_desc": "Prepared validation data enabled refinement of quality visualization.",
        "long_desc": "With validation datasets in hand showing expected accuracy patterns, the visualization team refined how to display quality metrics clearly and compellingly to motivate continued correction work."
    },
    {
        "source": "V3C_I2",
        "target": "V3C_J0",
        "short_desc": "Implemented confidence system informed visual design refinement.",
        "long_desc": "With the confidence scoring system built and working, the visualization team refined color schemes, layouts, and visual encodings to make confidence levels and quality improvements immediately apparent."
    },
    {
        "source": "V3C_J0",
        "target": "V3C_K0",
        "short_desc": "Refined visualization design informed performance optimization work.",
        "long_desc": "With the visualization finalized, development focused on optimizing the algorithms powering the visualizations to ensure real-time quality metric calculation wouldn't slow users down."
    },
    {
        "source": "V3C_K0",
        "target": "V3C_L0",
        "short_desc": "Optimized code ready for rigorous accuracy testing.",
        "long_desc": "With performance optimized, the team could conduct thorough testing ensuring confidence scores accurately reflected call uncertainty and quality metrics correctly measured improvements."
    },
    {
        "source": "V3C_L0",
        "target": "V3C_M0",
        "short_desc": "Successful accuracy testing indicated need for documentation.",
        "long_desc": "Testing confirmed confidence scoring and quality validation systems were reliable. The team then planned comprehensive documentation and help systems so users could confidently interpret these new features."
    },
    {
        "source": "V3C_M0",
        "target": "V3C_N1",
        "short_desc": "Documentation plan specified what example datasets were needed.",
        "long_desc": "To create effective tutorials and examples, the team needed representative real-world variant datasets showing diverse scenarios: clear clusters, ambiguous cases, and extreme calling failures."
    },
    {
        "source": "V3C_M0",
        "target": "V3C_N2",
        "short_desc": "Specified help systems drove implementation of documentation infrastructure.",
        "long_desc": "With documentation content planned, development built the help system infrastructure: contextual tooltips, tutorial system, searchable documentation, and video tutorials."
    },
    {
        "source": "V3C_N1",
        "target": "V3C_O0",
        "short_desc": "Gathered example datasets enabled comprehensive workflow testing.",
        "long_desc": "With real example variants collected, the team could conduct final testing covering complete user workflows including confidence scoring interpretation and quality metric understanding."
    },
    {
        "source": "V3C_N2",
        "target": "V3C_O0",
        "short_desc": "Completed help systems enabled full end-to-end testing.",
        "long_desc": "With help systems in place, final testing could evaluate the complete user experience: whether users could accomplish tasks, understand results, and access help when needed."
    },
    {
        "source": "V3C_O0",
        "target": "V3C_P1",
        "short_desc": "Successful testing cleared path for visual polish and publication readiness.",
        "long_desc": "Comprehensive testing confirmed the tool was functionally complete and correct. The visualization team then conducted final aesthetic refinements for production quality."
    },
    {
        "source": "V3C_O0",
        "target": "V3C_P2",
        "short_desc": "Final testing validation enabled production deployment preparation.",
        "long_desc": "With testing complete and quality confirmed, development began final infrastructure setup: production servers, monitoring systems, backup systems, and user account management."
    },
    {
        "source": "V3C_P1",
        "target": "V3C_Q0",
        "short_desc": "Publication-quality UI ready for deployment testing.",
        "long_desc": "With visual polish complete, the refined interface was deployed to production systems for final testing before public launch."
    },
    {
        "source": "V3C_P2",
        "target": "V3C_Q0",
        "short_desc": "Deployment infrastructure ready for final production validation.",
        "long_desc": "With servers set up, monitoring configured, and support systems ready, final testing could verify everything functioned correctly in the production environment."
    },
    {
        "source": "V3C_Q0",
        "target": "V3C_R0",
        "short_desc": "Successful deployment enabled integration of additional reference data.",
        "long_desc": "After successful production launch and initial stability confirmation, the team integrated additional rare variant reference datasets to help users calibrate their assessments."
    },
    {
        "source": "V3C_R0",
        "target": "V3C_S0",
        "short_desc": "Expanded data integrated, ongoing operational maintenance began.",
        "long_desc": "With reference data in place, the focus shifted to continuous production support: monitoring performance, addressing issues, optimizing bottlenecks, and keeping systems secure."
    },
    {
        "source": "V3C_S0",
        "target": "V3C_T0",
        "short_desc": "Ongoing maintenance established foundation for continuous improvement.",
        "long_desc": "Stable production operations enabled systematic monitoring of tool usage, collection of user feedback, and identification of opportunities for future enhancements."
    },
    // EXTERNAL
    {
        "source": "V3C_E0",
        "target": "LAVAA_G0",
        "short_desc": "V3C's expert user testing approach informed LAVAA's validation methodology.",
        "long_desc": "V3C's successful strategy of conducting rigorous testing with experienced FinnGen geneticists directly informed how LAVAA would validate its volcano plot approach. Both tools recognized the critical importance of expert user feedback."
    },
    {
        "source": "V3C_D1",
        "target": "LAVAA_E2",
        "short_desc": "V3C's understanding of expert workflow efficiency informed LAVAA's filtering design.",
        "long_desc": "V3C's interviews revealed that expert users needed rapid, efficient workflows for processing large variant sets. This insight directly informed LAVAA's design of filtering and quick-access features enabling researchers to rapidly analyze variants."
    },
    {
        "source": "V3C_K0",
        "target": "LAVAA_M0",
        "short_desc": "V3C's performance optimization strategies informed LAVAA's server optimization.",
        "long_desc": "V3C's experience optimizing for responsive interaction with large variant datasets directly informed LAVAA's approach to optimizing the volcano plot engine for thousands of associations. Both tools faced similar performance challenges."
    },
    {
        "source": "V3C_L0",
        "target": "EB_P0",
        "short_desc": "V3C's rigorous accuracy testing approach informed EB's comprehensive testing strategy.",
        "long_desc": "V3C's methodical validation of correction accuracy and quality metrics directly influenced EB's approach to comprehensive production testing. Both tools needed to ensure data accuracy and consistency."
    },
    {
        "source": "V3C_H0",
        "target": "EB_B1",
        "short_desc": "V3C's user validation approach influenced EB's stakeholder engagement strategy.",
        "long_desc": "V3C's practice of validating expanded features directly with users before development informed EB's approach to conducting stakeholder interviews and user research before finalizing specifications."
    },
    // ------------------- LAVAA -------------------
 {
        "source": "LAVAA_A1",
        "target": "LAVAA_B0",
        "short_desc": "Pleiotropy phenomenon identification enabled data structure analysis.",
        "long_desc": "Understanding that variant pleiotropy (affecting multiple phenotypes differently) was the phenomenon to communicate, the team analyzed PheWAS data to determine what structure and information would best reveal these relationships."
    },
    {
        "source": "LAVAA_A2",
        "target": "LAVAA_B0",
        "short_desc": "Data structure analysis confirmed visualization approach was necessary.",
        "long_desc": "Examining PheWAS data structure (p-values, beta values, phenotypes) confirmed that current visualization methods failed to capture effect direction and magnitude simultaneously. This validated user needs for a new approach."
    },
    {
        "source": "LAVAA_A3",
        "target": "LAVAA_B0",
        "short_desc": "Specified functionalities informed understanding of user requirements.",
        "long_desc": "Defining what the tool needed to do (volcano plot rendering, filtering, export) clarified what users would need: ability to see significance and effect size together, filter phenotypes, and generate publication-ready figures."
    },
    {
        "source": "LAVAA_A4",
        "target": "LAVAA_B0",
        "short_desc": "Visualization exploration validated user need for new visual encoding.",
        "long_desc": "The visualization team's exploration of volcano plot encodings demonstrated that a new visual approach could effectively reveal pleiotropy patterns that traditional methods missed. This confirmed that geneticists needed this visualization."
    },
    {
        "source": "LAVAA_B0",
        "target": "LAVAA_C0",
        "short_desc": "Identified user needs specified what functions the tool must support.",
        "long_desc": "Understanding that geneticists needed to see significance and effect magnitude simultaneously, compare effects across phenotypes, and prepare publication-ready figures directly informed functional specifications."
    },
    {
        "source": "LAVAA_C0",
        "target": "LAVAA_D1",
        "short_desc": "Specified functionalities guided data preparation requirements.",
        "long_desc": "Functionality requirements (phenotype grouping, credible set filtering, meta-analysis display) specified what data structures and metadata needed to be prepared to support these features."
    },
    {
        "source": "LAVAA_C0",
        "target": "LAVAA_D2",
        "short_desc": "Specified functionalities informed development priorities and architecture.",
        "long_desc": "Requirements for filtering, credible set visualization, and batch processing informed development architecture and component design for the LAVAA volcano plot tool."
    },
    {
        "source": "LAVAA_D1",
        "target": "LAVAA_E2",
        "short_desc": "Prepared data infrastructure enabled visualization refinement.",
        "long_desc": "With PheWAS data, credible set information, and phenotype hierarchies prepared, the visualization team could design interactive features and refined visual encodings supporting advanced analysis."
    },
    {
        "source": "LAVAA_D2",
        "target": "LAVAA_E1",
        "short_desc": "Development of core tool enabled specification of advanced filtering features.",
        "long_desc": "With the basic volcano plot tool functioning, the team could design additional filtering capabilities and specification of advanced features that would enhance the tool's analytical power."
    },
    {
        "source": "LAVAA_D2",
        "target": "LAVAA_E2",
        "short_desc": "Developed core tool informed visual refinement for publication quality.",
        "long_desc": "With the core development complete, the visualization team focused on refining color schemes, layouts, and visual presentations to ensure publication-ready quality."
    },
    {
        "source": "LAVAA_E1",
        "target": "LAVAA_F0",
        "short_desc": "Advanced filtering specifications informed development of complete tool.",
        "long_desc": "With advanced filtering, meta-analysis display, and comparison features specified, the development team built these capabilities into the complete LAVAA implementation."
    },
    {
        "source": "LAVAA_E2",
        "target": "LAVAA_F0",
        "short_desc": "Advanced feature specifications informed development of complete tool.",
        "long_desc": "Requirements for filtering, credible set visualization, and batch processing informed development architecture and component design for the LAVAA volcano plot tool."
    },
    {
        "source": "LAVAA_F0",
        "target": "LAVAA_G0",
        "short_desc": "Feature-complete development enabled validation testing with researchers.",
        "long_desc": "With all functionalities implemented and integrated, the tool was ready for testing to confirm it effectively revealed variant pleiotropy patterns compared to traditional visualizations."
    },
    {
        "source": "LAVAA_G0",
        "target": "LAVAA_H1",
        "short_desc": "Positive testing results confirmed visualization design effectiveness.",
        "long_desc": "Testing validation showed the volcano plot approach effectively revealed pleiotropy patterns. This validated the design and informed refinements in color schemes and visual presentation."
    },
    {
        "source": "LAVAA_G0",
        "target": "LAVAA_H2",
        "short_desc": "Testing feedback informed visualization refinement for publication quality.",
        "long_desc": "User testing revealed refinements needed for publication quality visualizations. The team then focused on optimizing color schemes, layouts, and visual presentation for professional appearance."
    },
    {
        "source": "LAVAA_H1",
        "target": "LAVAA_I0",
        "short_desc": "Refined visualization enabled expansion of data infrastructure.",
        "long_desc": "With visual design finalized, the team expanded available data: additional PheWAS results, disease hierarchies, and external annotations. The refined visualization informed what additional data would be useful to display."
    },
    {
        "source": "LAVAA_H2",
        "target": "LAVAA_J2",
        "short_desc": "Publication-ready design enabled development of batch analysis capabilities.",
        "long_desc": "With static visualization refined for publication quality, the development team built batch processing tools allowing researchers to analyze multiple variants or phenotype sets without manual re-filtering."
    },
    {
        "source": "LAVAA_I0",
        "target": "LAVAA_J1",
        "short_desc": "Expanded data infrastructure enabled development of meta-analysis visualization.",
        "long_desc": "With additional PheWAS data and meta-analysis results available, the team could develop features showing effect estimates across cohorts and populations."
    },
    {
        "source": "LAVAA_I0",
        "target": "LAVAA_J2",
        "short_desc": "Additional data enabled implementation of variant comparison features.",
        "long_desc": "Expanded data and disease hierarchies enabled developing tools for side-by-side comparison of multiple variants' effects across phenotypes."
    },
    {
        "source": "LAVAA_J1",
        "target": "LAVAA_K0",
        "short_desc": "Meta-analysis implementation enabled comprehensive tool validation.",
        "long_desc": "With meta-analysis visualization and variant comparison tools implemented, the feature set was sufficiently advanced to warrant thorough validation testing."
    },
    {
        "source": "LAVAA_J2",
        "target": "LAVAA_K0",
        "short_desc": "Batch and comparison features implemented, tool ready for advanced validation.",
        "long_desc": "With advanced features complete, validation testing confirmed the tool effectively supported complex variant analysis and publication preparation workflows."
    },
    {
        "source": "LAVAA_K0",
        "target": "LAVAA_L1",
        "short_desc": "Validation of advanced features informed documentation planning.",
        "long_desc": "Understanding how researchers used advanced features guided what documentation would be most helpful, including explanation of meta-analysis interpretation and comparison workflow examples."
    },
    {
        "source": "LAVAA_K0",
        "target": "LAVAA_L2",
        "short_desc": "Feature validation revealed need for extensive tutorial materials.",
        "long_desc": "Testing showed that users needed guidance on interpreting volcano plots, using filters effectively, and creating publication-quality exports. This informed comprehensive tutorial content planning."
    },
    {
        "source": "LAVAA_L1",
        "target": "LAVAA_M0",
        "short_desc": "Planned documentation informed optimization of user-facing components.",
        "long_desc": "Planning what would be documented revealed opportunities to simplify interfaces: defaults were set based on common use patterns, and labels were refined based on documentation language developed."
    },
    {
        "source": "LAVAA_L2",
        "target": "LAVAA_M0",
        "short_desc": "Tutorial content informed final development of help systems.",
        "long_desc": "As tutorials were created, developers incorporated contextual help and tooltips into the interface itself, reducing the need for external documentation by making the interface more self-explanatory."
    },
    {
        "source": "LAVAA_M0",
        "target": "LAVAA_N1",
        "short_desc": "Optimized production deployment enabled data expansion with new analyses.",
        "long_desc": "With the tool deployed and performing well on servers, the team expanded available PheWAS datasets. The deployed infrastructure supported regular data updates."
    },
    {
        "source": "LAVAA_M0",
        "target": "LAVAA_N2",
        "short_desc": "Deployed tool enabled validation with manuscript authors.",
        "long_desc": "With the tool live and accessible, researchers beginning to use LAVAA in their work provided real-world validation. Their feedback confirmed the tool enhanced PheWAS analysis and communication."
    },
    {
        "source": "LAVAA_N1",
        "target": "LAVAA_O1",
        "short_desc": "Expanded data enabled development of customizable visualization features.",
        "long_desc": "With more diverse PheWAS data available, the team developed features for customizing plot aesthetics to match different journal requirements and publication contexts."
    },
    {
        "source": "LAVAA_N1",
        "target": "LAVAA_O2",
        "short_desc": "Data expansion supported development of batch analysis.",
        "long_desc": "Additional data sources enabled batch processing to work across diverse phenotype sets, allowing researchers to analyze multiple variants or disease categories systematically."
    },
    {
        "source": "LAVAA_N2",
        "target": "LAVAA_O2",
        "short_desc": "Real-world usage validation confirmed need for batch processing.",
        "long_desc": "Users working with large variant sets requested batch analysis capabilities. User feedback from early adopters validated the priority of implementing batch processing."
    },
    {
        "source": "LAVAA_O1",
        "target": "LAVAA_P0",
        "short_desc": "Styling customization completed, tool ready for final publication validation.",
        "long_desc": "With customization options implemented, the tool could accommodate diverse publication requirements. Comprehensive testing confirmed all features worked correctly for publication workflow."
    },
    {
        "source": "LAVAA_O2",
        "target": "LAVAA_P0",
        "short_desc": "Batch processing finalized, complete tool ready for publication.",
        "long_desc": "With batch analysis implemented and tested, the full feature set was validated. The tool was ready to be published as a peer-reviewed methods paper demonstrating its value."
    },
    {
        "source": "LAVAA_P0",
        "target": "LAVAA_Q0",
        "short_desc": "Final validation enabled creation of comprehensive visual documentation.",
        "long_desc": "With the published tool validated, the team created extensive visual documentation: example galleries showing real analyses, screenshots explaining features, and template workflows."
    },
    {
        "source": "LAVAA_Q0",
        "target": "LAVAA_R0",
        "short_desc": "Completed documentation informed web hosting and API infrastructure.",
        "long_desc": "Documentation content guided API design: endpoints were created to support documented workflows, and hosting infrastructure was configured to enable features described in documentation."
    },
    {
        "source": "LAVAA_R0",
        "target": "LAVAA_S0",
        "short_desc": "Deployed hosting and APIs enabled post-publication user support.",
        "long_desc": "With production infrastructure in place supporting API access and regular updates, the team could support active user communities and monitor tool usage patterns, guiding future improvements."
    },
    // EXTERNAL
    {
        "source": "LAVAA_F0",
        "target": "EB_D2",
        "short_desc": "LAVAA's successful visualization architecture influenced EB's feature specification.",
        "long_desc": "LAVAA's proven approach to visualizing complex genetic relationships informed how EB would specify features for endpoint comparison and relationship visualization. Both tools needed to reveal patterns in phenotypic data."
    },
    {
        "source": "LAVAA_H2",
        "target": "EB_N0",
        "short_desc": "LAVAA's publication-ready visual design informed EB's documentation approach.",
        "long_desc": "LAVAA's focus on creating publication-quality visualizations and comprehensive documentation influenced EB's approach to creating example galleries and visual documentation showcasing how to use the browser effectively."
    },
    {
        "source": "LAVAA_N2",
        "target": "EB_L0",
        "short_desc": "LAVAA's successful user adoption validated the importance of extended testing for EB.",
        "long_desc": "LAVAA's experience gaining broad adoption through rigorous user testing and publication influenced EB's decision to conduct extended testing with diverse researcher types before final deployment."
    },
    // ------------------- EB -------------------
    // INTERNAL
    {
        "source": "EB_A1",
        "target": "EB_B1",
        "short_desc": "Identified phenomenon challenges informed investigation of data relationships.",
        "long_desc": "Understanding that users struggled with endpoint relationships guided investigation of ICD-10 hierarchies and how endpoints nested within medical taxonomies. The phenomenon focus directed the research direction."
    },
    {
        "source": "EB_A1",
        "target": "EB_B2",
        "short_desc": "Phenomenon understanding specified what functionalities would help.",
        "long_desc": "The insight that hierarchical context was needed directly led to specifying hierarchical browsing, filtering, and comparison functionalities. The phenomenon identification drove functional requirements."
    },
    {
        "source": "EB_A2",
        "target": "EB_B1",
        "short_desc": "Diverse user needs confirmed focus on hierarchical data exploration.",
        "long_desc": "Different user types (researchers, scientists, clinicians) all needed to understand relationships and context. This validated the decision to make hierarchical exploration central to the solution."
    },
    {
        "source": "EB_A2",
        "target": "EB_B2",
        "short_desc": "Use cases specified required functionalities for different navigation needs.",
        "long_desc": "Different users needed different navigation paths: researchers investigating specific endpoints, scientists browsing broadly, clinicians finding relevant endpoints. These distinct needs specified functionalities for filtering and browsing."
    },
    {
        "source": "EB_B1",
        "target": "EB_C0",
        "short_desc": "Refined phenomenon understanding emerged from initial data analysis.",
        "long_desc": "After analyzing endpoint characteristics and relationships, the team deepened their phenomenon understanding: the solution needed to reveal patterns across hierarchies, not just present hierarchies. This refined insight guided subsequent work."
    },
    {
        "source": "EB_B2",
        "target": "EB_C0",
        "short_desc": "Specified functionalities were validated and refined based on data structure.",
        "long_desc": "Analyzing actual endpoint data revealed what comparison and filtering operations were practically feasible. The data analysis refined which functionalities should be prioritized."
    },
    {
        "source": "EB_C0",
        "target": "EB_D1",
        "short_desc": "Refined phenomenon guided data structure preparation.",
        "long_desc": "The clarified understanding of what needed to be revealed (patterns across hierarchies) specified how data should be structured and what metadata was important."
    },
    {
        "source": "EB_C0",
        "target": "EB_D2",
        "short_desc": "Refined phenomenon informed second round of user interviews.",
        "long_desc": "With deeper phenomenon understanding, the team conducted more targeted user interviews exploring how researchers preferred hierarchical navigation and what statistics mattered most for their decisions."
    },
    {
        "source": "EB_D1",
        "target": "EB_E0",
        "short_desc": "Prepared hierarchical data structures enabled visualization exploration.",
        "long_desc": "With optimized data structures representing ICD-10 hierarchy and endpoints, the visualization team could explore different approaches for displaying hierarchies visually."
    },
    {
        "source": "EB_D2",
        "target": "EB_E0",
        "short_desc": "User preferences from interviews informed visualization strategy.",
        "long_desc": "User feedback about preferred navigation patterns and important statistics directly influenced which visualization approaches were promising. The team prioritized approaches matching user mental models."
    },
    {
        "source": "EB_E0",
        "target": "EB_F0",
        "short_desc": "Visualization explorations informed prototype development priorities.",
        "long_desc": "Successful visualization approaches from the exploration phase guided what should be implemented first in the prototype. Promising designs became the foundation for development."
    },
    {
        "source": "EB_F0",
        "target": "EB_G1",
        "short_desc": "Working prototype revealed opportunities for additional functionalities.",
        "long_desc": "Building the prototype and interacting with it revealed use cases not initially anticipated: advanced filtering, statistics comparison, and integration planning. The prototype informed functionality expansion."
    },
    {
        "source": "EB_F0",
        "target": "EB_G2",
        "short_desc": "Prototype demonstration enabled user feedback collection.",
        "long_desc": "With a working prototype, the team could gather concrete user feedback. Testing revealed what was working well and what needed improvement."
    },
    {
        "source": "EB_G1",
        "target": "EB_H1",
        "short_desc": "Expanded functionality specifications informed final use case refinement.",
        "long_desc": "Deciding to add advanced filtering and comparison tools required understanding exactly how researchers would use these features. This informed observations of real research workflows."
    },
    {
        "source": "EB_G2",
        "target": "EB_H1",
        "short_desc": "Prototype feedback revealed actual user workflows.",
        "long_desc": "Observing how researchers used the prototype revealed their true workflows: browsing to find relevant endpoints, comparing related conditions, jumping between related entities. These observations informed use case refinement."
    },
    {
        "source": "EB_G2",
        "target": "EB_H2",
        "short_desc": "Testing feedback prioritized features for full development.",
        "long_desc": "User feedback indicated which features would have the highest impact. This feedback guided prioritization of features for full development phase."
    },
    {
        "source": "EB_H1",
        "target": "EB_I1",
        "short_desc": "Refined use cases informed data infrastructure expansion.",
        "long_desc": "Understanding refined use cases revealed that multiple hierarchies (ICD-10 and FinnGen-specific) would be valuable. This informed data preparation for supporting multiple hierarchical views."
    },
    {
        "source": "EB_H2",
        "target": "EB_I1",
        "short_desc": "",
        "long_desc": ""
    },
    {
        "source": "EB_H2",
        "target": "EB_I2",
        "short_desc": "Prioritized features informed visualization refinement planning.",
        "long_desc": "Identified priorities for high-impact features informed what visualization work would be most valuable. Color encoding strategies and visual hierarchy refinement focused on top-priority features."
    },
    {
        "source": "EB_I1",
        "target": "EB_J0",
        "short_desc": "Expanded data infrastructure enabled full browser development.",
        "long_desc": "Multiple hierarchies and rich metadata enabled building the comprehensive browser. The data infrastructure provided the foundation for the full feature set."
    },
    {
        "source": "EB_I2",
        "target": "EB_J0",
        "short_desc": "Refined visualizations informed implementation of browser features.",
        "long_desc": "Finalized visual design guided development: color schemes were implemented, visual hierarchies were coded, and interaction patterns were built as designed."
    },
    {
        "source": "EB_J0",
        "target": "EB_K1",
        "short_desc": "Completed browser development enabled data infrastructure updates.",
        "long_desc": "With the browser working, the team gathered new FinnGen data and updated endpoint definitions, ensuring the browser always displayed current information."
    },
    {
        "source": "EB_J0",
        "target": "EB_K2",
        "short_desc": "Developed browser functionality informed planning of customization features.",
        "long_desc": "Observing how researchers used the developed browser revealed desires for customization. Export and customization features were planned based on user needs."
    },
    {
        "source": "EB_K1",
        "target": "EB_L0",
        "short_desc": "Updated data informed extensive user testing.",
        "long_desc": "With current data integrated, the team conducted extended testing. User testing validated the browser with up-to-date information."
    },
    {
        "source": "EB_K2",
        "target": "EB_L0",
        "short_desc": "Added customization features enabled validation of broader use cases.",
        "long_desc": "With export and customization capabilities, the team could test whether the browser supported publication and presentation workflows."
    },
    {
        "source": "EB_L0",
        "target": "EB_M0",
        "short_desc": "Extended testing results informed definition of integration path.",
        "long_desc": "Successful testing and feedback about real-world usage informed how to integrate the browser into Risteys while maintaining its standalone functionality."
    },
    {
        "source": "EB_M0",
        "target": "EB_N0",
        "short_desc": "Defined integration approach informed documentation planning.",
        "long_desc": "Understanding the integration path helped the team create documentation that would work both for standalone users and Risteys-integrated users. Documentation had to cover both contexts."
    },
    {
        "source": "EB_N0",
        "target": "EB_O0",
        "short_desc": "Finalized documentation informed production development priorities.",
        "long_desc": "Documentation content revealed which features users would most need help with, informing development priorities for production optimization and scaling."
    },
    {
        "source": "EB_O0",
        "target": "EB_P0",
        "short_desc": "Production infrastructure completed, comprehensive testing conducted.",
        "long_desc": "With scalable infrastructure in place, thorough testing ensured performance, accuracy, and accessibility with the full FinnGen dataset."
    },
    {
        "source": "EB_P0",
        "target": "EB_Q1",
        "short_desc": "Validated production browser prepared for Risteys integration.",
        "long_desc": "Successful production testing confirmed the browser was ready for integration. Data preparation for Risteys integration could proceed confidently."
    },
    {
        "source": "EB_P0",
        "target": "EB_Q2",
        "short_desc": "Quality-assured browser informed integration feature planning.",
        "long_desc": "Validation of the standalone browser informed what features would be most important for the integrated version and how to maintain experience quality."
    },
    {
        "source": "EB_Q1",
        "target": "EB_R0",
        "short_desc": "Prepared integration data guided visual design for Risteys context.",
        "long_desc": "Data prepared for integration informed visual design decisions: colors and layouts were refined to integrate with Risteys' aesthetic while maintaining the browser's usability."
    },
    {
        "source": "EB_Q2",
        "target": "EB_R0",
        "short_desc": "Embedded mode features informed responsive design refinement.",
        "long_desc": "Requirements for embedded display and responsive design guided visual refinement ensuring the browser would look good in various contexts and sizes."
    },
    {
        "source": "EB_R0",
        "target": "EB_S0",
        "short_desc": "Finalized visual design enabled implementation of Risteys integration.",
        "long_desc": "With visual design complete for integrated context, development could build the component architecture and implement seamless Risteys integration."
    },
    {
        "source": "EB_S0",
        "target": "EB_T1",
        "short_desc": "Completed integration revealed need to assess core phenomenon in new context.",
        "long_desc": "With the browser now integrated into Risteys and in active use, the team reflected on whether the core phenomenon (enabling hierarchical endpoint exploration) was effectively addressed in the integrated context."
    },
    {
        "source": "EB_S0",
        "target": "EB_T2",
        "short_desc": "Integrated experience informed gathering of new feedback.",
        "long_desc": "With Risteys integration live, the team collected feedback from integrated users about new use cases and opportunities revealed by the integrated context."
    },
    {
        "source": "EB_T1",
        "target": "EB_U0",
        "short_desc": "Reassessed phenomenon guided planning for advanced features.",
        "long_desc": "Reflection on whether the core phenomenon was well-addressed informed planning: cross-phenotype analysis would reveal additional patterns, recommendations would help users discover related endpoints."
    },
    {
        "source": "EB_T2",
        "target": "EB_U0",
        "short_desc": "Integrated feedback identified advanced features to implement.",
        "long_desc": "User feedback from integrated experience identified specific advanced features that would address emerging use cases and deepen analytical capabilities."
    },
    {
        "source": "EB_U0",
        "target": "EB_V0",
        "short_desc": "Planned advanced features informed development priorities.",
        "long_desc": "Specifications for cross-phenotype analysis and recommendation engine guided development: algorithms were designed, data structures were created to support new analyses."
    },
    {
        "source": "EB_V0",
        "target": "EB_W0",
        "short_desc": "Implemented advanced analyses required new visualizations.",
        "long_desc": "Cross-phenotype relationships and recommendations required new visual representations: network diagrams, similarity matrices, and relationship highlighting were designed."
    },
    {
        "source": "EB_W0",
        "target": "EB_X0",
        "short_desc": "Designed visualizations informed final optimization and deployment.",
        "long_desc": "With visual designs finalized for advanced features, development focused on optimization ensuring smooth performance of network and recommendation algorithms."
    },
    {
        "source": "EB_X0",
        "target": "EB_Y0",
        "short_desc": "Deployed advanced features established ongoing feedback processes.",
        "long_desc": "With advanced features live, the team established continuous feedback collection and improvement processes, ensuring the ongoing work-in-progress tool evolved to meet emerging research needs."
    },
    // EXTERNAL
    {
        "source": "EB_A1",
        "target": "LAVAA_I0",
        "short_desc": "EB's hierarchical user research informed LAVAA's metadata expansion.",
        "long_desc": "EB's investigation of how researchers navigate hierarchical data relationships influenced LAVAA's decision to expand metadata and disease hierarchies. The insight that hierarchical grouping aids understanding applied to both tools."
    },
    {
        "source": "EB_B2",
        "target": "WIFG_K0",
        "short_desc": "EB's user interview findings informed WIFG's multilingual deployment strategy.",
        "long_desc": "EB's discovery of diverse user types and their distinct information needs influenced WIFG's approach to supporting multiple languages and creating flexible content that could serve researchers, clinicians, and public audiences."
    },
    {
        "source": "EB_O0",
        "target": "LAVAA_M0",
        "short_desc": "EB's production scaling experience informed LAVAA's deployment infrastructure.",
        "long_desc": "EB's experience scaling to handle full FinnGen endpoint datasets with multiple concurrent users directly informed LAVAA's approach to production deployment, monitoring systems, and handling large PheWAS datasets."
    },
]

export default edges
