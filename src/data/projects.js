const projects = [
{
    "id": "LOD",
    "title": "Lines Of Descent",
    "year": "2023",
    "cont": "Margo Nowicka, Federico Simeoni, Nicola Cerioli, Rupesh Vyas, Mary Pat Reeve, Mark Daly, Mari Anneli Kaunnisto, Mervi Aavikko",
    "short_desc": "Interactive art combining cellular automata with agent based logic in a genetic bottleneck simulation. Art developed for Nature Cover artwork.",
    "long_desc": "This is a simulation of the genetic bottleneck effect on an imaginary population. Every row is a population generation which can be added with a click. Every cell is an individual and the color (given randomly) represents a specific genetic mutation. The color will be likely passed down to future generations. When a genetic bottleneck happens, the population splits, fewer variations are left and the colour of the new branch tends to homogenise.\n\nThis simulation is an interactive version of the Nature cover created in collaboration between Aalto University and FinnGen.",
    "links": {
        "tool": "https://geneviz.aalto.fi/lines_of_descent/",
        "paper": "",
        "other": ""
    }
},
{
    "id": "WIFG",
    "title": "What is FinnGen?",
    "year": "2022–2023",
    "cont": "Adelaida Avila, Anastasiia Balagurova, Ulla Eronen, Margo Nowicka, Nicola Cerioli, Rupesh Vyas, Mari Kaunisto, Mary Pat Reeve, Mervi Aavikko, Helen Cooper, Aarno Palotie, Mark Daly",
    "short_desc": "This scrollytelling website introduces the goals and benefits of the FinnGen project, guiding users through the genetic research process, from data collection to research findings. It offers an engaging and accessible way to learn about FinnGen’s impact on healthcare in Finland and beyond.",
    "long_desc": "This scrollytelling website aims to communicate the goals and benefits of FinnGen and provide an overview of the project. The website takes the user on a journey through the process behind the genetic research, explaining how the data is collected and processed, and outlining the current research findings. In addition, the website delves into the potential impact of the project, providing insights on how the results improve our understanding of disease mechanisms, thus helping in developing new treatments and interventions for a range of diseases.\n\nThe website emphasizes the importance of Finnish citizens’ contribution to genetic research. It highlights the ways in which citizens can get involved in the project and contribute to the research, and explains how their data is being used in scientific discoveries without compromising the privacy and integrity of participants.\n\nOverall, this website provides an accessible and engaging way for people to learn about the FinnGen project, its goals, processes and its potential impact on healthcare in Finland and around the world.",
    "links": {
        "tool": "https://geneviz.aalto.fi/what-is-finngen/",
        "paper": "",
        "other": ""
    }
},
{
    "id": "V3C",
    "title": "Variant Cluster Call Corrector (V3C)",
    "year": "2021",
    "cont": "Federico Simeoni, Nicola Cerioli, Rupesh Vyas, Mary Pat Reeve",
    "short_desc": "The Variant Cluster Call Corrector is a tool that helps researchers explore the data created by automatic variant calling (the “raw calls”), and enables them to manually imput the call of rare variants.",
    "long_desc": "Variant calling is the process of identifying variants from sequence data. This is done through a biological assay system, called Affymetrix chip, which assigns the genotypes (AA, Aa, aa) to genetic data. However, genotypes of rare variants are often poorly identified by automated softwares due to the limited amount of data available. The goal of this project was to improve the calling of rare variants – specifically those that are too rare to be inputted – as these rare variants can be especially important for understanding the genetic causes of diseases.\n\nTo assess how accurate genotype calls are for a variant, calls can be represented as a cluster plot, with the X axis representing major allele intensity, and the Y axis representing minor allele intensity. Each dot corresponds to one individual in the data set. If the calls are of high quality, they form clear clusters which represent genotype calls (AA, Aa, aa). However, cluster plots of rare variants often show no clear separation between clusters and they have many missing calls (i.e. no genotype has been assigned). Due to the difficulty of calling rare variants, the data from these variants usually can not be used.\n\nThe Variant Cluster Call Corrector is a tool that helps researchers explore the data created by automatic variant calling (the “raw calls”), and enables them to manually imput the call of rare variants.",
    "links": {
        "tool": "https://geneviz.aalto.fi/V3C/",
        "paper": "",
        "other": ""
    }
},
{
    "id": "LAVAA",
    "title": "Lightweight Association Viewer Across Ailments (LAVAA)",
    "year": "2023",
    "cont": "Nicola Cerioli, Rupesh Vyas",
    "short_desc": "The LAVAA volcano plot tool allows researchers to view not only the significance of PheWAS results of a variant, but also enables one to quickly see different directions and magnitudes of effect across phenotypes. Additional attributes – number of cases and if the variant is in a credible set for the phenotype, can also be visualized and output to a publication-ready file.",
    "long_desc": "The LAVAA (Lightweight Association Viewer Across Ailments) volcano plot tool allows researchers to view not only the significance of PheWAS results of a variant, but also enables one to quickly see different directions and magnitudes of effect across phenotypes. Additional attributes – number of cases and if the variant is in a credible set for the phenotype, can also be visualized and output to a publication-ready file.\n\nA GWAS (genome-wide association study) is a statistical analysis of which genetic variants are more associated with a particular phenotype. A variant is a DNA change that may be associated with a medical phenotype. A phenotype, also called a trait, is an observable physical property of an organism; examples of phenotypes include height or hair color, or characteristics that can be measured in the laboratory, such as levels of hormones or blood cells.\nGWAS are done to point to biological mechanisms affecting the phenotype, and make predictions of the phenotype from genomic information. PheWAS (phenome-wide association study) is a complementary study to GWAS in which you look at all the phenotypes associated with a particular variant.\n\nUsually, PheWAS data is presented as a Manhattan Plot, in which genomic coordinates are displayed along the x-axis, with the negative logarithm of the association p-value for each single variant displayed on the y-axis. Each dot on the Manhattan plot signifies a variant, and triangles (up and down) indicate the direction of effect (protective or risk).\nHowever, this type of representation can not show clustering between the data points that would fall into the category of either protective or risk factors and leads to issues when there are too many categories on an x-axis. On top of that, as a static visualization, the plot does not enable any interactive filtering that could further help the analysis. To tackle these issues, Eric Fauman presented an alternative concept for using Volcano Plots for PheWAS data at F2F in March 2021.\n\nA Volcano Plot is a type of scatterplot commonly used for statistical applications. It is popular in transcriptomic analysis, as it enables quick visual identification of significant data points. Using it for PheWAS data highlights the biologically interesting features, allowing the viewer to compare different phenotypes quickly, and spot interesting patterns, such as higher effect sizes in certain subgroupings of disease even though they might not be significant due to hit in power. \nThe LAVAA tool allows researchers to better analyse PheWAS data and export their findings directly for publications.\nIn the LAVAA interface, the x-axis of the Volcano Plot plots the negative log 10 p-value of each data point. As the p-value indicates statistical significance, higher points on the x-axis also have a higher statistical significance. The y-axis shows the beta value, which basically means the effect size. The further a point is from the center (which is the 0), the bigger its effect size is. Points on the negative side have a stronger effect on reducing the risk of disease, while on the positive side they have a stronger effect on increasing the risk of disease.\nWhen considering both axes together, points that fall into the upper corners can be expected to have both high significance and effect size, and are potentially interesting for further examination.",
    "links": {
        "tool": "https://geneviz.aalto.fi/LAVAA/",
        "paper": "https://academic.oup.com/bioinformaticsadvances/article/3/1/vbad018/7036851",
        "other": ""
    }
},
{
    "id": "EB",
    "title": "The Endpoint Browser",
    "year": "2023–2025",
    "cont": "Stella Keppo, Federico Simeoni, Nicola Cerioli, Mark Daly, Mary Pat Reeve, Rupesh Vyas, Guus Hoeberechts",
    "short_desc": "The endpoint browser is a tool for visualizing FinnGen-specific phenotypic data, which includes health event indicators known as endpoints. The browser enhances data exploration by positioning endpoints within the ICD-10 hierarchy and a FinnGen-specific framework, allowing for visual comparisons of key statistics like case numbers, genome-wide significance hits, gender balance, and meta-analysis results.",
    "long_desc": "The endpoint browser is a work-in-progress, stand-alone visual browsing application for FinnGen-specific phenotypic data. Phenotypic data in this case refers to indicators of health events or outcomes defined using different data from health registries. These indicators in FinnGen are referred to as endpoints, and they are generally accessed through a phenotype-level data exploration system Risteys. This browser application is designed to ultimately be implemented as a component in Risteys, merging the browser to the front-page of the parent system.\n\nRisteys is a public online platform where researchers acquire information about different endpoints including facts and figures about their definitions, statistics and their relationships with other endpoints. This visualization project included asking what kind of challenges users are experiencing while exploring phenotypic data in Risteys, and how these challenges can be addressed by data visualization.\n\nThis visualization widens the context of presentation for each endpoint from Risteys by positioning them in the ICD-10 hierarchy, and thus providing an overview of the neighbourhoods of each endpoint. On top of this, each endpoint has the potential to be visible in a FinnGen-specific hierarchy as well, and these can also be observed. First -level comparisons between endpoints are enabled through visual encoding methods coding primary information for the users; These include statistical numbers such as case numbers, genome-wide significance hits numbers, gender case balance and information on meta-analyses conducted for each endpoint.",
    "links": {
        "tool": "https://geneviz.aalto.fi/EB_dev/?view=lists",
        "paper": "",
        "other": ""
    }
}]

export default projects