const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sectionNavigator = document.querySelector(".section-navigator");
const sectionNavToggle = document.querySelector(".section-nav-toggle");
const sectionNavLinks = Array.from(document.querySelectorAll(".section-nav-panel a"));
const sectionCurrent = document.querySelector(".section-current");
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDots = Array.from(document.querySelectorAll("[data-hero-dot]"));
const heroPrev = document.querySelector("[data-hero-prev]");
const heroNext = document.querySelector("[data-hero-next]");
const teamRoot = document.querySelector("[data-team-root]");
const guestbookForm = document.querySelector(".guestbook-form");
const languageToggle = document.querySelector("[data-language-toggle]");
const languageButtons = Array.from(document.querySelectorAll("[data-lang-option]"));
const newsModals = Array.from(document.querySelectorAll("[data-news-modal]"));
const newsModalOpenButtons = Array.from(document.querySelectorAll("[data-news-modal-open]"));
const newsModalCloseButtons = Array.from(document.querySelectorAll("[data-news-modal-close]"));
const publicationFilterButtons = Array.from(document.querySelectorAll("[data-paper-filter]"));
const paperItems = Array.from(document.querySelectorAll(".paper-list li"));
const easterEggButtons = Array.from(document.querySelectorAll("[data-easter-egg-step]"));
const easterEggModal = document.querySelector("[data-easter-egg-modal]");
const easterEggVideo = document.querySelector("[data-easter-egg-video]");
const easterEggCloseButtons = Array.from(document.querySelectorAll("[data-easter-egg-close]"));
let activeHeroSlide = 0;
let heroTimer;
let lastFocusedElement;
let easterEggProgress = 0;
let currentLanguage = "zh";
let activeNewsModal;

const languageText = {
  "闫亚宾教授课题组": "Yan Yabin Research Group",
  "ECUST · Micro-/Nano- Mechanics & reliability": "ECUST · Micro-/Nano- Mechanics & reliability",
  "导师简介": "PI Profile",
  "研究方向": "Research",
  "团队成员": "People",
  "论文成果": "Publications",
  "新闻动态": "News",
  "留言板": "Guestbook",
  "展开章节导航": "Open section navigation",
  "收起章节导航": "Close section navigation",
  "页面导航": "Page Navigation",
  "首页": "Home",
  "论文与项目": "Publications & Projects",
  "华东理工大学 · 机械与动力工程学院": "East China University of Science and Technology · School of Mechanical and Power Engineering",
  "在这里，你可以理解“东西为什么会坏”，也能学习如何让材料、结构与装备更安全、更耐用、更高效。":
    "Here, we study why materials and structures fail, and how to make them safer, more durable, and more efficient.",
  "微纳结构可靠性": "Micro/Nano Reliability",
  "微纳尺度原位力学实验": "In-Situ Micro/Nano Mechanics",
  "装备损伤失效": "Equipment Damage & Failure",
  "AI驱动功能材料": "AI-Driven Functional Materials",
  "电子显微原位实验": "In-Situ Electron Microscopy",
  "查看研究方向": "View Research",
  "看新闻动态": "Read News",
  "认识团队成员": "Meet the Team",
  "课题组新闻": "Group News",
  "发表论文": "Publications",
  "申请/授权发明专利": "Patent Applications / Grants",
  "软件著作权": "Software Copyrights",
  "英文专著章节": "Book Chapters",
  "闫亚宾 教授 · 博士生导师": "Prof. Yabin Yan · Doctoral Supervisor",
  "闫亚宾教授主要从事宏微观机械装备损伤失效评价、新型功能材料设计与应用、基于电子显微技术的微纳尺度仪器装置开发等方面的研究。":
    "Prof. Yabin Yan focuses on damage and failure assessment of mechanical equipment across scales, design and application of functional materials, and micro/nano-scale instruments based on electron microscopy.",
  "主持国家自然科学基金项目、上海市高层次人才项目、上海市自然科学基金面上项目、上海市航天科技创新基金等多项课题，并与企业联合开展高新电子产品可靠性评价研究。":
    "He has led projects funded by the National Natural Science Foundation of China, Shanghai talent and natural science programs, and the Shanghai Aerospace Science and Technology Innovation Fund, while collaborating with industry on reliability assessment of advanced electronic products.",
  "地址": "Address",
  "上海市梅陇路130号华东理工大学机械与动力工程学院":
    "School of Mechanical and Power Engineering, East China University of Science and Technology, 130 Meilong Road, Shanghai",
  "招生专业": "Admissions",
  "动力工程与工程热物理、机械工程、能源动力、机械等":
    "Power Engineering and Engineering Thermophysics, Mechanical Engineering, Energy and Power, Mechanics, and related fields",
  "华东理工大学机械与动力工程学院 教授": "Professor, School of Mechanical and Power Engineering, ECUST",
  "华东理工大学机械与动力工程学院 副研究员": "Associate Research Fellow, School of Mechanical and Power Engineering, ECUST",
  "日本京都大学机械工程与科学系 特任研究员/访问学者":
    "Program-Specific Researcher / Visiting Scholar, Department of Mechanical Engineering and Science, Kyoto University",
  "日本京都大学 工学博士": "Ph.D. in Engineering, Kyoto University",
  "学术兼职": "Academic Service",
  "奖励与荣誉": "Awards and Honors",
  "中国微米纳米技术学会青年工作委员会委员": "Member, Youth Committee of the Chinese Society of Micro-Nano Technology",
  "《宁夏工程技术》编委会委员": "Editorial Board Member, Ningxia Engineering Technology",
  "13th International Fatigue Congress（第十三届国际疲劳会议）“Cyclic deformation and crack initiation”分会场主席，2023年":
    "Session Chair for Cyclic Deformation and Crack Initiation, 13th International Fatigue Congress, 2023",
  "中国微米纳米技术学会第24届学术年会暨第13届国际会议组织委员会委员，2022年":
    "Organizing Committee Member, 24th Annual Meeting and 13th International Conference of the Chinese Society of Micro-Nano Technology, 2022",
  "中国微米纳米技术学会第23届学术年会暨第12届国际会议组织委员会委员，2021年":
    "Organizing Committee Member, 23rd Annual Meeting and 12th International Conference of the Chinese Society of Micro-Nano Technology, 2021",
  "中国微米纳米技术学会第23届学术年会暨第12届国际会议“微纳结构工程化制造与表征”分会场主席，2021年":
    "Session Chair for Engineering Manufacturing and Characterization of Micro/Nano Structures, 2021",
  "2022年 华东理工大学青年教师教学竞赛二等奖": "Second Prize, ECUST Young Faculty Teaching Competition, 2022",
  "2016年 平成28年度日本材料学会论文奖（191/3）": "Paper Award, Society of Materials Science, Japan, 2016",
  "2016年 中国工程物理研究院“十大青年锐杰”": "Top Ten Young Talents, China Academy of Engineering Physics, 2016",
  "2015年 中国力学学会实验力学专业委员会青年优秀论文奖": "Young Scholar Paper Award, Experimental Mechanics Committee, Chinese Society of Theoretical and Applied Mechanics, 2015",
  "2015年 中国微米纳米技术学会优秀口头报告奖": "Outstanding Oral Presentation Award, Chinese Society of Micro-Nano Technology, 2015",
  "2014年 四川省科学技术协会学术论文一等奖": "First Prize for Academic Paper, Sichuan Association for Science and Technology, 2014",
  "从集成电路、传感器、MEMS等微纳结构，到航空发动机、海洋平台、氢能装备和先进功能材料，课题组关注多尺度、多场耦合条件下的结构安全与性能演化。":
    "From integrated circuits, sensors, and MEMS to aero-engines, offshore platforms, hydrogen equipment, and advanced functional materials, the group studies structural safety and performance evolution under multiscale and multiphysics conditions.",
  "微纳结构设计与可靠性评价": "Micro/Nano Structure Design and Reliability Assessment",
  "面向集成电路、MEMS与传感器，结合结构优化、原位实验和数值模拟，揭示高温、振动、疲劳等条件下的失效机制。":
    "For integrated circuits, MEMS, and sensors, we combine structural optimization, in-situ experiments, and numerical simulation to reveal failure mechanisms under high temperature, vibration, and fatigue.",
  "高端复杂装备损伤失效": "Damage and Failure of Advanced Equipment",
  "聚焦压力容器、海上平台、航空发动机和国防装备，研究高温、高压、腐蚀及氢环境下的损伤演化与寿命预测。":
    "We study damage evolution and life prediction for pressure vessels, offshore platforms, aero-engines, and defense equipment under high temperature, high pressure, corrosion, and hydrogen environments.",
  "AI驱动功能材料设计": "AI-Driven Functional Materials Design",
  "利用机器学习与优化算法预测材料性能、加速筛选，覆盖传感、储能电池、催化和氢能存储材料。":
    "Machine learning and optimization algorithms are used to predict material properties and accelerate screening for sensing, batteries, catalysis, and hydrogen storage materials.",
  "微纳尺度精密实验装置": "Micro/Nano-Scale Precision Experimental Systems",
  "开发适配电子显微镜的微型加载、环境控制和电化学实验装置，实现纳米尺度实时观测与多场耦合测试。":
    "We develop miniature loading, environmental control, and electrochemical devices compatible with electron microscopes for real-time nanoscale observation and multiphysics testing.",
  "点击成员卡片查看研究方向、个人兴趣、毕业去向与联系方式。":
    "Click a member card to view research interests, hobbies, current status or career destination, and contact information.",
  "在读": "Current",
  "毕业啦": "Alumni",
  "返回成员列表": "Back to Members",
  "博士 / 硕博研究生": "Ph.D. / M.S.-Ph.D. Track Students",
  "硕士研究生": "Master's Students",
  "研究方向": "Research",
  "兴趣爱好": "Hobbies",
  "当前状态": "Status",
  "毕业去向": "Destination",
  "联系方式": "Contact",
  "资料待补充": "To be updated",
  "待补充": "To be updated",
  "代表性论文": "Selected Publications",
  "承担科研项目": "Research Projects",
  "论文成果与科研项目": "Publications and Research Projects",
  "2025-至今": "2025-Present",
  "ResearchGate 主页": "ResearchGate Profile",
  "2021及以前": "2021 and Earlier",
  "恭喜苏婷同学顺利通过博士学位论文答辩！":
    "Congratulations to Su Ting on Successfully Passing Her Doctoral Dissertation Defense!",
  "点击查看答辩现场照片与祝福。": "View defense photos and congratulations.",
  "热烈祝贺苏婷同学顺利完成博士学位论文答辩，为自己的博士阶段画上圆满句点。":
    "Warm congratulations to Su Ting on successfully completing her doctoral dissertation defense and bringing her doctoral journey to a wonderful conclusion.",
  "答辩过程中，苏婷同学围绕二维材料力学性能与可靠性相关研究进行了系统汇报，充分展示了扎实的科研积累、严谨的学术态度和持续探索的研究精神。":
    "During the defense, Su Ting gave a systematic presentation on the mechanical properties and reliability of two-dimensional materials, demonstrating solid research training, rigorous academic thinking, and a spirit of sustained exploration.",
  "从课题攻关到论文写作，从实验分析到答辩展示，每一步都凝结着长期坚持与认真投入。祝愿苏婷同学在未来的科研与人生道路上继续保持热爱与笃定，步履从容，前程似锦，开启更加精彩的新篇章！":
    "From research challenges to dissertation writing, and from experimental analysis to the final defense, every step reflects long-term dedication and careful effort. We wish Su Ting continued passion and confidence in her future research and life, with a bright path ahead and many new chapters to come.",
  "苏婷同学作博士学位论文答辩报告": "Su Ting presenting her doctoral dissertation defense",
  "苏婷同学与闫亚宾老师合影": "Su Ting with Prof. Yabin Yan",
  "答辩现场合影": "Group photo after the defense",
  "万拾佳等在 Acta Materialia 发表单晶锡微尺度塑性研究":
    "Wan Shijia et al. Published Microscale Plasticity Research on Single-Crystal Tin in Acta Materialia",
  "万拾佳等合作完成的研究论文“":
    "The research paper by Wan Shijia and collaborators, titled \"",
  "该研究利用原位 SEM 微拉伸和微悬臂梁弯曲实验，系统考察了单晶 β-Sn 在不同应变速率及加载方式下的塑性变形与损伤行为。":
    "Using in-situ SEM micro-tensile and micro-cantilever bending experiments, this study systematically examined plastic deformation and damage in single-crystal β-Sn under different strain rates and loading modes.",
  "结果表明，应变率和加载模式共同影响位错滑移、蠕变损伤与应变梯度效应。该工作为微纳金属结构及电子互连材料的可靠性评估提供了实验参考。":
    "The results show that strain rate and loading mode jointly affect dislocation slip, creep damage, and strain-gradient effects. This work provides experimental guidance for reliability assessment of micro/nano metal structures and electronic interconnect materials.",
  "单晶锡微尺度塑性研究发表在 Acta Materialia":
    "Microscale plasticity study of single-crystal tin published in Acta Materialia",
  "点击查看论文信息与研究亮点。": "View paper information and research highlights.",
  "董亚辉、万拾佳等在 IJMS 发表 Ti₂AlNb 合金微力学研究":
    "Dong Yahui, Wan Shijia et al. Published Ti₂AlNb Alloy Micromechanics Research in IJMS",
  "董亚辉、万拾佳、王祎珩、苏婷等合作完成的研究论文“":
    "The research paper by Dong Yahui, Wan Shijia, Wang Yiheng, Su Ting, and collaborators, titled \"",
  "”发表在 ": "\", was published in ",
  "Ti₂AlNb 合金中 B2 相与 O 相的协同变形直接影响材料的强塑性匹配。该研究采用原位 SEM 微柱压缩实验，系统考察了不同尺寸微柱中两相的变形行为及界面传递机制。":
    "The cooperative deformation of B2 and O phases in Ti₂AlNb alloys directly affects the strength-ductility balance. This study used in-situ SEM micropillar compression to examine the deformation of both phases and the interfacial transfer mechanism in micropillars of different sizes.",
  "结合晶体塑性有限元模拟，研究揭示了 B2/O 相界面附近的滑移传递、应力分配与尺寸效应，为理解 Ti₂AlNb 合金的多尺度塑性变形机制提供了新的实验依据。":
    "Combined with crystal-plasticity finite-element simulations, the study reveals slip transfer, stress partitioning, and size effects near B2/O interfaces, providing new experimental evidence for multiscale plastic deformation mechanisms in Ti₂AlNb alloys.",
  "王祎珩等在 IJF 发表微尺度单晶铜疲劳研究":
    "Wang Yiheng et al. Published Microscale Single-Crystal Copper Fatigue Research in IJF",
  "王祎珩、万拾佳等合作完成的研究论文“":
    "The research paper by Wang Yiheng, Wan Shijia, and collaborators, titled \"",
  "该研究通过原位 SEM 拉压疲劳实验，考察了不同应变幅与加载频率下微尺度单晶铜疲劳短裂纹的萌生和扩展行为。":
    "This study used in-situ SEM tension-compression fatigue experiments to investigate the initiation and propagation of fatigue short cracks in microscale single-crystal copper under different strain amplitudes and loading frequencies.",
  "研究比较了不同加载条件下短裂纹的演化路径与寿命特征，并从循环硬化与软化行为出发解释裂纹扩展速率的波动，为微纳金属结构的疲劳可靠性研究提供了参考。":
    "The work compares short-crack evolution paths and lifetime characteristics under different loading conditions, and explains fluctuations in crack-growth rate through cyclic hardening and softening, providing a reference for fatigue reliability studies of micro/nano metal structures.",
  "苏婷、荣超等在 IJEM 发表二维材料力学综述":
    "Su Ting, Chao Rong et al. Published a 2D Materials Mechanics Review in IJEM",
  "点击查看综述信息与研究内容。": "View review information and research content.",
  "苏婷、荣超等合作完成的综述论文“":
    "The review paper by Su Ting, Chao Rong, and collaborators, titled \"",
  "该综述系统梳理了二维材料高质量力学性质测试的关键环节，重点讨论原位显微测试、样品转移、边缘缺陷和层间结合等因素对测量结果与器件可靠性的影响。":
    "This review systematically outlines the key steps in high-quality mechanical-property testing of two-dimensional materials, focusing on how in-situ microscopy, sample transfer, edge defects, and interlayer bonding affect measurement results and device reliability.",
  "文章进一步总结了二维材料的力学机制及其在柔性电子、精密传感和集成器件中的应用挑战，为选择适配的材料转移与力学测试策略提供了参考。":
    "The article further summarizes the mechanical mechanisms of two-dimensional materials and their application challenges in flexible electronics, precision sensing, and integrated devices, providing guidance for selecting suitable transfer and mechanical-testing strategies.",
  "近日，课题组闫亚宾教授、22级硕博研究生万拾佳等合作完成的研究论文 “":
    "Recently, the paper completed by Prof. Yabin Yan, 2022 M.S.-Ph.D. track student Shijia Wan, and collaborators, titled \"",
  "” 发表在 Acta Materialia, 316 (2026) 122458。":
    "\", was published in Acta Materialia, 316 (2026) 122458.",
  "β-Sn 是典型的低熔点、低对称性金属，其微尺度塑性变形机制与应变率、加载方式和几何尺度密切相关，对电子封装、微纳结构和低熔点金属服役可靠性具有重要意义。然而，此类材料在微尺度下的位错运动、蠕变损伤与应变梯度效应之间的耦合关系仍有待深入理解。":
    "β-Sn is a typical low-melting-point, low-symmetry metal. Its microscale plastic deformation is closely related to strain rate, loading mode, and geometry, and is important for the reliability of electronic packaging, micro/nano structures, and low-melting-point metals in service. However, the coupled relation among dislocation motion, creep damage, and strain-gradient effects in this class of materials remains to be understood.",
  "该研究通过原位 SEM 微拉伸实验和微悬臂梁弯曲实验，系统考察了单晶 β-Sn 在不同应变速率下的塑性行为与应变梯度效应。结果表明，两种加载方式下均激活了 (101)-[101] 滑移系，但具体变形机制同时受到应变率和加载模式影响。":
    "Using in-situ SEM micro-tensile tests and micro-cantilever bending experiments, the study systematically examined the plastic behavior and strain-gradient effects of single-crystal β-Sn under different strain rates. The results show that the (101)-[101] slip system is activated in both loading modes, while the deformation mechanism is affected by both strain rate and loading mode.",
  "在较高应变率下，材料变形主要由位错滑移主导；在较低应变率下，微拉伸试样表现出明显的蠕变损伤，而微弯曲试样中的损伤受到抑制，这与陡峭应力梯度和表面效应有关。研究还发现，弯曲条件下的显著强化来源于几何必要位错的累积。":
    "At higher strain rates, deformation is mainly governed by dislocation slip. At lower strain rates, micro-tensile specimens show pronounced creep damage, while such damage is suppressed in micro-bending specimens because of the steep stress gradient and surface effects. The study also shows that the significant strengthening under bending originates from the accumulation of geometrically necessary dislocations.",
  "通过对表面滑移台阶的定量分析，研究揭示了位错塞积引起的背应力与台阶高度平方根之间的标度关系；应变率敏感性指数 m = 0.043-0.046 以及激活体积分析进一步表明，单晶 β-Sn 的变形机制会从低速率下的扩散辅助攀移动态转变为高速率下的热激活滑移。":
    "Quantitative analysis of surface slip steps reveals a scaling relation between the back stress caused by dislocation pile-ups and the square root of step height. The strain-rate sensitivity m = 0.043-0.046 and activation-volume analysis further indicate a dynamic transition from diffusion-assisted climb at low rates to thermally activated slip at high rates in single-crystal β-Sn.",
  "该工作为理解低熔点金属在微尺度下的扩散控制损伤、梯度诱导强化和加载方式相关应力分布提供了新的实验依据，也为微纳金属结构和电子互连材料的可靠性评估提供了重要参考。":
    "This work provides new experimental evidence for understanding diffusion-controlled damage, gradient-induced hardening, and loading-dependent stress distributions in low-melting-point metals at the microscale. It also offers useful guidance for reliability assessment of micro/nanoscale metal structures and electronic interconnect materials.",
  "恭喜23级五位硕士毕业生顺利毕业": "Congratulations to the Five 2023 Master's Graduates",
  "点击查看毕业合影与祝福。": "View graduation photos and congratulations.",
  "恭喜王祎珩、吴昊、董亚辉、徐渝京、史春浩顺利毕业，预祝苏婷顺利毕业！":
    "Congratulations to Wang Yiheng, Wu Hao, Dong Yahui, Xu Yujing, and Shi Chunhao on their graduation. Best wishes to Su Ting for a successful graduation ahead.",
  "苏婷、万拾佳赴英国格拉斯哥参加 ESIA18-ISSI2026": "Su Ting and Wan Shijia attended ESIA18-ISSI2026 in Glasgow, UK",
  "苏婷、万拾佳赴英国格拉斯哥参加第18届工程结构完整性评估国际会议":
    "Su Ting and Wan Shijia Attended the 18th International Conference on Engineering Structural Integrity Assessment",
  "点击查看会议现场照片与参会报道。": "View conference photos and the participation report.",
  "2026年5月16日至22日，苏婷、万拾佳赴英国格拉斯哥参加 ESIA18-ISSI2026，并在分会场作学术报告。":
    "From May 16 to 22, 2026, Su Ting and Wan Shijia attended ESIA18-ISSI2026 in Glasgow, UK, and delivered session presentations.",
  "本次会议全称为第18届工程结构完整性评估国际会议暨2026结构完整性国际研讨会，即 18th International Conference on Engineering Structural Integrity Assessment in conjunction with the 2026 International Symposium on Structural Integrity（ESIA18-ISSI2026）。会议在英国斯特拉斯克莱德大学 Technology and Innovation Centre 举行，由英国工程结构完整性论坛（FESI）与中国结构完整性联盟（CSIC）联合组织。":
    "The conference was the 18th International Conference on Engineering Structural Integrity Assessment in conjunction with the 2026 International Symposium on Structural Integrity, ESIA18-ISSI2026. It was held at the Technology and Innovation Centre of the University of Strathclyde and jointly organized by the UK Forum for Engineering Structural Integrity, FESI, and the China Structural Integrity Consortium, CSIC.",
  "会议围绕工程结构完整性评估、疲劳与断裂、蠕变损伤、高温结构部件、氢能装备安全、增材制造结构、残余应力、表面处理与涂层、结构健康监测、人工智能辅助可靠性评价等方向展开，吸引了来自英国、中国、欧洲及其他国家和地区高校、科研机构与工业界的专家学者参会。":
    "The program covered engineering structural integrity assessment, fatigue and fracture, creep damage, high-temperature structural components, hydrogen equipment safety, additive-manufactured structures, residual stress, surface treatment and coatings, structural health monitoring, and AI-assisted reliability assessment. It brought together researchers and industry specialists from the UK, China, Europe, and other regions.",
  "参会期间，苏婷作题为“Tensile Mechanical Properties and Edge Defect-Driven Degradation in Bilayer Graphene”的分会场报告；万拾佳作题为“Effect of high angle grain boundary on plastic deformation and fracture of micro-bicrystal copper: An in-situ SEM experimental and multiscale simulation study”的分会场报告，展示了课题组在二维材料力学性能和微尺度双晶铜塑性变形与断裂机制方面的近期研究成果。":
    "During the conference, Su Ting presented Tensile Mechanical Properties and Edge Defect-Driven Degradation in Bilayer Graphene, and Wan Shijia presented Effect of high angle grain boundary on plastic deformation and fracture of micro-bicrystal copper: An in-situ SEM experimental and multiscale simulation study. Their talks shared the group's recent progress in the mechanical properties of two-dimensional materials and the plastic deformation and fracture mechanisms of micro-bicrystal copper.",
  "参会人员合影": "Group photo of participants",
  "苏婷作分会场报告": "Su Ting presenting in a technical session",
  "万拾佳作分会场报告": "Wan Shijia presenting in a technical session",
  "会议交流活动现场": "Conference exchange event",
  "大会报告现场": "Plenary session",
  "课题组网站上线试运行": "Research Group Website Soft Launch",
  "网站内容持续整理中，欢迎补充团队照片、组会动态、论文封面和招生通知。":
    "Website content is still being organized. Team photos, meeting updates, paper covers, and admission notices are welcome.",
  "二维薄膜剪切失稳相关研究发表": "Study on Shear Instability of 2D Films Published",
  "二维 Ti": "2D Ti",
  " MXene 单层纳米片剪切性能研究发表在 Nature Communications":
    " MXene Monolayer Shear Study Published in Nature Communications",
  "点击查看论文详情与研究亮点。": "View paper details and research highlights.",
  "近日，课题组相关合作研究成果以“": "Recently, collaborative research from the group, titled \"",
  "”为题发表在 Nature Communications。": "\", was published in Nature Communications.",
  "该研究首次实现了 Ti": "This study achieved the first nanoscale in-situ shear test of Ti",
  " 单层纳米片的纳米尺度原位剪切测试，并结合分子动力学模拟和第一性原理计算，从实验与原子尺度共同揭示了二维材料在剪切载荷下的损伤起源和稳定抗皱机制。":
    " monolayer nanosheets, combining molecular dynamics simulations and first-principles calculations to reveal the damage origin and stable wrinkle-resistance mechanism of 2D materials under shear loading.",
  "论文由华东理工大学与合作单位共同完成。荣超、苏婷、余天昊为共同第一作者，闫亚宾、张博威、轩福贞为共同通讯作者。":
    "The paper was completed by East China University of Science and Technology and collaborators. Chao Rong, Ting Su, and Tianhao Yu are co-first authors; Yabin Yan, Bowei Zhang, and Fu-Zhen Xuan are co-corresponding authors.",
  "原文链接：": "Original article: ",
  "论文首页：": "Article front page: ",
  "图示：论文页面、研究概述及单层 Ti": "Figure: article page, research overview, and in-plane shear test schematic for monolayer Ti",
  " 纳米片面内剪切测试示意。": " nanosheets.",
  "图示：论文发表于 Acta Materialia, 316 (2026) 122458，研究围绕单晶 β-Sn 的应变率效应与应变梯度效应展开。":
    "Figure: the paper was published in Acta Materialia, 316 (2026) 122458, and focuses on strain-rate effects and strain-gradient effects in single-crystal β-Sn.",
  "荣超、苏婷等在 Nature Communications 发表二维材料剪切性能研究":
    "Chao Rong, Su Ting et al. Published 2D Materials Shear Research in Nature Communications",
  "荣超、苏婷、余天昊等合作完成的研究论文“":
    "The research paper by Chao Rong, Su Ting, Tianhao Yu, and collaborators, titled \"",
  "该研究实现了 Ti": "This study achieved nanoscale in-situ shear testing of Ti",
  " 单层纳米片的纳米尺度原位剪切测试，并结合分子动力学模拟和第一性原理计算，揭示了二维材料在剪切载荷下的损伤起源与稳定抗皱机制。":
    " monolayer nanosheets, and combined molecular-dynamics simulations with first-principles calculations to reveal damage origins and stable wrinkle resistance in two-dimensional materials under shear loading.",
  "研究表明，该材料在持续剪切载荷下仍保持良好的刚度、断裂强度和抗皱能力，为柔性电子、结构复合薄膜及微纳器件的可靠性设计提供了新的力学依据。":
    "The material maintains favorable stiffness, fracture strength, and wrinkle resistance under sustained shear loading, offering new mechanical guidance for the reliable design of flexible electronics, structural composite films, and micro/nano devices.",
  "相关工作发表在 Nature Communications，后续可补充新闻链接与论文图片。":
    "The related work was published in Nature Communications. News links and paper images can be added later.",
  "欢迎相关专业同学报考交流": "Prospective Students Are Welcome",
  "机械、能源动力、储能与新能源、力学、智能制造等方向同学可通过邮箱联系。":
    "Students in mechanical engineering, energy and power, energy storage and new energy, mechanics, intelligent manufacturing, and related fields are welcome to contact us by email.",
  "欢迎留下问题、建议或交流意向，我们会在方便时查看并回复。":
    "Questions, suggestions, and collaboration interests are welcome. We will review and reply when possible.",
  "请勿填写此项": "Please leave this field blank",
  "昵称": "Name",
  "邮箱": "Email",
  "选填": "Optional",
  "留言内容": "Message",
  "留言将发送至课题组网站后台。": "Your message will be sent to the research group website backend.",
  "提交留言": "Submit",
  "© 2026 闫亚宾教授课题组 · 华东理工大学机械与动力工程学院":
    "© 2026 Yan Yabin Research Group · School of Mechanical and Power Engineering, ECUST",
  "你是本站第": "You are visitor No.",
  "个访客": "",
  "教师主页": "Faculty Profile",
  "返回顶部": "Back to Top",
  "研究方向配图来源：": "Research image credits:",
  "苏婷": "Su Ting",
  "万拾佳": "Wan Shijia",
  "余天昊": "Yu Tianhao",
  "张子勤": "Zhang Ziqin",
  "尚岩松": "Shang Yansong",
  "黄智超": "Huang Zhichao",
  "宋家昌": "Song Jiachang",
  "徐嘉怡": "Xu Jiayi",
  "李博通": "Li Botong",
  "陈汉": "Chen Han",
  "汪增辉": "Wang Zenghui",
  "周一峰": "Zhou Yifeng",
  "结构疲劳与寿命预测": "Structural fatigue and life prediction",
  "音乐、游泳、游戏": "Music, swimming, gaming",
  "王祎珩": "Wang Yiheng",
  "吴昊": "Wu Hao",
  "董亚辉": "Dong Yahui",
  "徐渝京": "Xu Yujing",
  "史春浩": "Shi Chunhao",
  "张文雨": "Zhang Wenyu",
  "王春雨": "Wang Chunyu",
  "韩忠": "Han Zhong",
  "惠云龙": "Hui Yunlong",
  "俞添琛": "Yu Tianchen",
  "李林峰": "Li Linfeng",
  "吴广泽": "Wu Guangze",
  "曾凡明": "Zeng Fanming",
  "程华兴": "Cheng Huaxing",
  "杨锐": "Yang Rui",
  "李振凯": "Li Zhenkai",
  "陈亦楠": "Chen Yinan",
  "金徐洁": "Jin Xujie",
  "许国庆": "Xu Guoqing",
  "陈豪": "Chen Hao",
  "周夺": "Zhou Duo",
  "向名芝": "Xiang Mingzhi",
  "李晟": "Li Sheng",
  "尹朦": "Yin Meng",
  "21级硕博研究生": "2021 M.S.-Ph.D. Track Student",
  "22级硕博研究生": "2022 M.S.-Ph.D. Track Student",
  "24级博士研究生": "2024 Ph.D. Student",
  "24级硕博研究生": "2024 M.S.-Ph.D. Track Student",
  "25级硕博研究生": "2025 M.S.-Ph.D. Track Student",
  "24级硕士研究生": "2024 Master's Student",
  "25级硕士研究生": "2025 Master's Student",
  "23级硕士研究生": "2023 Master's Student",
  "22级硕士研究生": "2022 Master's Student",
  "21级硕士研究生": "2021 Master's Student",
  "20级硕士研究生": "2020 Master's Student",
  "19级硕士研究生": "2019 Master's Student",
  "16级本科生": "2016 Undergraduate",
  "二维材料的原位力学研究": "In-situ mechanics of two-dimensional materials",
  "微纳米金属强度力学实验与晶体塑性仿真": "Microscale metal strength experiments and crystal plasticity simulation",
  "高分子功能凝胶材料构筑与多尺度多场耦合机制研究":
    "Functional polymer gel construction and multiscale multiphysics coupling mechanisms",
  "金属氢损伤": "Hydrogen damage in metals",
  "高铁转向架耐候钢疲劳损伤失效研究": "Fatigue damage and failure of weathering steel in high-speed rail bogies",
  "第一性原理计算、电催化": "First-principles calculations and electrocatalysis",
  "第一性原理、电催化": "First-principles calculations and electrocatalysis",
  "第一性原理计算：铁电材料": "First-principles calculations of ferroelectric materials",
  "第一性原理计算": "First-principles calculations",
  "晶体塑性有限元仿真": "Crystal plasticity finite element simulation",
  "固态电池的锂枝晶失效模式": "Lithium dendrite failure modes in solid-state batteries",
  "微尺度金属疲劳损伤": "Microscale metal fatigue damage",
  "微纳米合金强度及微组织影响晶体塑性仿真":
    "Crystal plasticity simulation of micro/nano-scale alloy strength and microstructural effects",
  "柔性薄膜太阳电池、机械结构强度": "Flexible thin-film solar cells and mechanical structural strength",
  "形状记忆合金弹卡性能研究、高通量相场模拟":
    "Shape memory alloy snap-fit performance and high-throughput phase-field simulation",
  "断裂相场": "Phase-field fracture",
  "冲击动力学": "Impact dynamics",
  "高温蠕变": "High-temperature creep",
  "第一性原理计算、析氢催化": "First-principles calculations and hydrogen evolution catalysis",
  "结构疲劳仿真": "Structural fatigue simulation",
  "微纳材料的力学性能分析": "Mechanical property analysis of micro/nano materials",
  "第一性原理计算、有限元仿真": "First-principles calculations and finite element simulation",
  "瑜伽、旅游": "Yoga, travel",
  "游戏、阅读": "Games, reading",
  "音乐、电子产品、电影": "Music, electronics, movies",
  "跳舞、运动": "Dancing, sports",
  "健身、跳舞": "Fitness, dancing",
  "健身、跑步、音乐": "Fitness, running, music",
  "游戏、看剧": "Games, shows",
  "游戏、羽毛球": "Games, badminton",
  "游戏、电影": "Games, movies",
  "阅读、音乐": "Reading, music",
  "健身、游泳、游戏": "Fitness, swimming, games",
  "音乐、游泳、游戏": "Music, swimming, games",
  "骑行、电影、动漫": "Cycling, movies, anime",
  "电影、徒步、音乐": "Movies, hiking, music",
  "音乐、电影、游戏": "Music, movies, games",
  "游戏、跳舞": "Games, dancing",
  "游戏、阅读、电影": "Games, reading, movies",
  "游戏、健身": "Games, fitness",
  "网球、旅游": "Tennis, travel",
  "游戏、旅游": "Games, travel",
  "绘画": "Drawing",
  "篮球、健身、网球": "Basketball, fitness, tennis",
  "打游戏": "Gaming",
  "游戏": "Games",
  "爬山、音乐": "Hiking, music",
  "劳逸逸结合": "Work-life balance",
  "篮球": "Basketball",
  "网球、旅游、阅读": "Tennis, travel, reading",
  "看剧、追星、旅游": "Shows, fandom, travel",
  "羽毛球、音乐": "Badminton, music",
  "骑行、旅游、桌游、游戏": "Cycling, travel, board games, games",
  "旅游、猫": "Travel, cats",
  "ABB（上海）机器人有限公司": "ABB (Shanghai) Robotics Co., Ltd.",
  "三一重工": "Sany Heavy Industry",
  "杭州天智精密科技有限公司": "Hangzhou Tianzhi Precision Technology Co., Ltd.",
  "长江电力有限公司": "China Yangtze Power Co., Ltd.",
  "格科半导体有限公司": "GalaxyCore Semiconductor Co., Ltd.",
  "中芯国际集成电路制造（北京）有限公司": "Semiconductor Manufacturing International (Beijing) Corporation",
  "上海交通大学深造": "Further study at Shanghai Jiao Tong University",
  "远景动力技术（江苏）有限公司": "Envision AESC Technology (Jiangsu) Co., Ltd.",
  "中国电子科技集团公司第三十九研究所": "The 39th Research Institute of China Electronics Technology Group Corporation",
  "中国船舶集团上海船舶研究设计院": "Shanghai Merchant Ship Design and Research Institute, CSSC",
  "内德史罗夫有限公司": "Nedschroef",
  "远景能源有限公司": "Envision Energy Co., Ltd.",
  "浙江华云科技有限公司": "Zhejiang Huayun Technology Co., Ltd.",
  "联合汽车电子有限公司": "United Automotive Electronic Systems Co., Ltd.",
  "湖北武汉选调生": "Selected Graduate Program, Wuhan, Hubei",
  "南京航空航天大学读博": "Ph.D. study at Nanjing University of Aeronautics and Astronautics",
  "纳铁福传动系统": "Nexteer Automotive Driveline Systems",
  "上海联影医疗": "Shanghai United Imaging Healthcare",
  "上海凯赛生物技术股份有限公司": "Cathay Biotech Inc.",
  "上海集成电路研发中心": "Shanghai IC R&D Center",
  "先导慧电": "Lead Intelligence",
  "浦东新区公务员选调生": "Selected Civil Servant, Pudong New Area",
  "日本东北大学": "Tohoku University, Japan",
  "国家自然科学基金联合基金重点支持项目：基于服役载荷的高速列车转向架构架全寿命周期疲劳损伤演化机理及寿命预测研究":
    "NSFC Joint Fund Key Program: Full-life-cycle fatigue damage evolution and life prediction of high-speed train bogie frames under service loads",
  "国家自然科学基金面上项目：裂纹非连续性扩展的量子化断裂理论模型研究":
    "NSFC General Program: Quantized fracture theory model for discontinuous crack propagation",
  "国家自然科学基金青年基金：微纳米部件中双相材料界面分层破坏的原位实验研究与分析":
    "NSFC Young Scientists Fund: In-situ investigation and analysis of interfacial delamination in two-phase materials in micro/nano components",
  "上海市“东方学者”特聘教授人才项目": "Shanghai Eastern Scholar Distinguished Professor Program",
  "上海市自然科学基金面上项目：基于SEM原位激振加载的纳米金属材料高周疲劳失效机理与寿命预测研究":
    "Shanghai Natural Science Foundation General Program: High-cycle fatigue failure mechanisms and life prediction of nanometals based on SEM in-situ vibration loading",
  "上海市航天科技创新基金项目：高过载条件下异质复合结构变形与失效特性的模拟研究":
    "Shanghai Aerospace Science and Technology Innovation Fund: Simulation of deformation and failure in heterogeneous composite structures under high-overload conditions",
  "中国航发北京航空材料研究院项目：Ti2AlNb高温合金疲劳、蠕变特性实验研究与模拟分析":
    "AECC Beijing Institute of Aeronautical Materials project: Experimental study and simulation of fatigue and creep behavior in Ti2AlNb high-temperature alloy",
  "企业联合技术攻关项目：自升式大型海上平台的抗震能力评估":
    "Industry collaborative project: Seismic capacity assessment of large jack-up offshore platforms",
  "企业联合技术攻关项目：电子产品微观焊接结构的损伤失效分析与寿命预测":
    "Industry collaborative project: Damage and failure analysis and life prediction for micro-welded structures in electronic products",
  "中国工程物理研究院合作项目：NiTiNb合金相变的微尺度原位表征实验":
    "Collaboration with China Academy of Engineering Physics: Microscale in-situ characterization of phase transformation in NiTiNb alloy",
  "中国工程物理研究院院长基金": "President's Fund of China Academy of Engineering Physics",
  "中国工程物理研究院科学技术发展基金": "Science and Technology Development Fund of China Academy of Engineering Physics",
  "中国工程物理研究院重大项目": "Major Program of China Academy of Engineering Physics",
};

const attributeTranslations = {
  en: {
    title: "Yan Yabin Research Group | East China University of Science and Technology",
    description:
      "The Yan Yabin Research Group at East China University of Science and Technology focuses on material and structural reliability, in-situ micro/nano experiments, functional material design, and precision experimental instruments.",
    attributes: [
      [".brand", "aria-label", "Back to home"],
      [".nav-toggle", "aria-label", "Open navigation"],
      [".site-nav", "aria-label", "Main navigation"],
      [".section-navigator", "aria-label", "Page section navigation"],
      [".section-nav-toggle", "aria-label", "Open section navigation"],
      [".section-nav-panel", "aria-label", "Section navigation"],
      [".hero", "aria-label", "Research group homepage hero"],
      [".hero-slider", "aria-label", "Research group photo carousel"],
      [".hero-tags", "aria-label", "Research keywords"],
      [".hero-news-ticker", "aria-label", "Research group news ticker"],
      [".hero-controls", "aria-label", "Homepage photo controls"],
      [".hero-dots", "aria-label", "Select homepage photo"],
      [".publication-filter", "aria-label", "Filter selected publications by year"],
      ["[data-hero-prev]", "aria-label", "Previous photo"],
      ["[data-hero-next]", "aria-label", "Next photo"],
      ["[data-hero-dot='0']", "aria-label", "Show photo 1"],
      ["[data-hero-dot='1']", "aria-label", "Show photo 2"],
      ["[data-hero-dot='2']", "aria-label", "Show photo 3"],
      [".profile-photo img", "alt", "Photo of Prof. Yabin Yan"],
      [".section-heading + .research-grid .research-card:nth-child(1) img", "alt", "Metal interconnects in an integrated circuit under a microscope"],
      [".section-heading + .research-grid .research-card:nth-child(2) img", "alt", "Close-up of aero-engine blades"],
      [".section-heading + .research-grid .research-card:nth-child(3) img", "alt", "AI-driven autonomous materials discovery workflow"],
      [".section-heading + .research-grid .research-card:nth-child(4) img", "alt", "Electron microscope and in-situ experimental device"],
      ["input[name='name']", "placeholder", "How should we address you"],
      ["input[name='email']", "placeholder", "For receiving replies"],
      ["textarea[name='message']", "placeholder", "Write what you would like to discuss"],
      [".news-modal-close", "aria-label", "Close news dialog"],
      [".easter-egg-panel", "aria-label", "Easter egg video"],
      [".easter-egg-close", "aria-label", "Close easter egg video"],
      [".graduation-gallery", "aria-label", "Graduation photos"],
      [".graduation-gallery img:nth-child(1)", "alt", "The 2023 master's graduates with Prof. Yabin Yan"],
      [".graduation-gallery img:nth-child(2)", "alt", "Research group graduation photo in front of the Mao Zedong statue"],
      [".graduation-gallery img:nth-child(3)", "alt", "Research group graduation photo at the university gate"],
      [".defense-gallery", "aria-label", "Su Ting defense photos"],
      [".defense-gallery figure:nth-child(1) img", "alt", "Su Ting presenting her doctoral dissertation defense"],
      [".defense-gallery figure:nth-child(2) img", "alt", "Su Ting with Prof. Yabin Yan after the defense"],
      [".defense-gallery figure:nth-child(3) img", "alt", "Group photo after Su Ting's doctoral dissertation defense"],
      [".conference-gallery:not(.defense-gallery)", "aria-label", "Conference photos"],
      [".conference-gallery:not(.defense-gallery) figure:nth-child(1) img", "alt", "Group photo of ESIA18-ISSI2026 participants"],
      [".conference-gallery:not(.defense-gallery) figure:nth-child(2) img", "alt", "Su Ting presenting in a technical session"],
      [".conference-gallery:not(.defense-gallery) figure:nth-child(3) img", "alt", "Wan Shijia presenting in a technical session"],
      [".conference-gallery:not(.defense-gallery) figure:nth-child(4) img", "alt", "ESIA18-ISSI2026 conference exchange event"],
      [".conference-gallery:not(.defense-gallery) figure:nth-child(5) img", "alt", "ESIA18-ISSI2026 plenary session"],
      ["#acta-tin-news-modal .paper-detail-figure img", "alt", "Acta Materialia article page on single-crystal tin plasticity"],
      ["#ijms-tialnb-news-modal .paper-detail-figure img", "alt", "International Journal of Mechanical Sciences article page on Ti₂AlNb alloy micromechanics"],
      ["#ijf-copper-news-modal .paper-detail-figure img", "alt", "International Journal of Fatigue article page on microscale single-crystal copper fatigue"],
      ["#ijem-2d-materials-news-modal .paper-detail-figure img", "alt", "International Journal of Extreme Manufacturing review article page on 2D material mechanics"],
      ["#nc-mxene-news-modal .paper-detail-figure img", "alt", "Nature Communications article page on 2D material shear properties"],
    ],
  },
  zh: {
    title: "闫亚宾教授课题组 | 华东理工大学",
    description:
      "华东理工大学机械与动力工程学院闫亚宾教授课题组，聚焦材料与结构可靠性、微纳尺度原位实验、功能材料设计与精密实验仪器开发。",
    attributes: [
      [".brand", "aria-label", "返回首页"],
      [".nav-toggle", "aria-label", "打开导航"],
      [".site-nav", "aria-label", "主导航"],
      [".section-navigator", "aria-label", "页面章节导航"],
      [".section-nav-toggle", "aria-label", "展开章节导航"],
      [".section-nav-panel", "aria-label", "章节导航"],
      [".hero", "aria-label", "课题组首页横幅"],
      [".hero-slider", "aria-label", "课题组照片轮播"],
      [".hero-tags", "aria-label", "研究关键词"],
      [".hero-news-ticker", "aria-label", "课题组新闻滚动栏"],
      [".hero-controls", "aria-label", "首页照片控制"],
      [".hero-dots", "aria-label", "选择首页照片"],
      [".publication-filter", "aria-label", "按年份筛选代表性论文"],
      ["[data-hero-prev]", "aria-label", "上一张照片"],
      ["[data-hero-next]", "aria-label", "下一张照片"],
      ["[data-hero-dot='0']", "aria-label", "显示第1张照片"],
      ["[data-hero-dot='1']", "aria-label", "显示第2张照片"],
      ["[data-hero-dot='2']", "aria-label", "显示第3张照片"],
      [".profile-photo img", "alt", "闫亚宾教授照片"],
      [".section-heading + .research-grid .research-card:nth-child(1) img", "alt", "显微镜下的集成电路金属互连线"],
      [".section-heading + .research-grid .research-card:nth-child(2) img", "alt", "航空发动机叶片近景"],
      [".section-heading + .research-grid .research-card:nth-child(3) img", "alt", "AI驱动自动化材料发现流程"],
      [".section-heading + .research-grid .research-card:nth-child(4) img", "alt", "电子显微镜与原位实验装置"],
      ["input[name='name']", "placeholder", "如何称呼您"],
      ["input[name='email']", "placeholder", "用于接收回复"],
      ["textarea[name='message']", "placeholder", "写下您想交流的内容"],
      [".news-modal-close", "aria-label", "关闭新闻弹窗"],
      [".easter-egg-panel", "aria-label", "彩蛋视频"],
      [".easter-egg-close", "aria-label", "关闭彩蛋视频"],
      [".graduation-gallery", "aria-label", "毕业合影"],
      [".graduation-gallery img:nth-child(1)", "alt", "23级硕士毕业生与闫亚宾老师合影"],
      [".graduation-gallery img:nth-child(2)", "alt", "课题组毕业季毛主席像前合影"],
      [".graduation-gallery img:nth-child(3)", "alt", "课题组毕业季校门合影"],
      [".defense-gallery", "aria-label", "苏婷答辩现场照片"],
      [".defense-gallery figure:nth-child(1) img", "alt", "苏婷同学作博士学位论文答辩报告"],
      [".defense-gallery figure:nth-child(2) img", "alt", "苏婷同学与闫亚宾老师合影"],
      [".defense-gallery figure:nth-child(3) img", "alt", "苏婷同学博士学位论文答辩现场合影"],
      [".conference-gallery:not(.defense-gallery)", "aria-label", "会议现场照片"],
      [".conference-gallery:not(.defense-gallery) figure:nth-child(1) img", "alt", "ESIA18-ISSI2026参会人员合影"],
      [".conference-gallery:not(.defense-gallery) figure:nth-child(2) img", "alt", "苏婷作分会场报告"],
      [".conference-gallery:not(.defense-gallery) figure:nth-child(3) img", "alt", "万拾佳作分会场报告"],
      [".conference-gallery:not(.defense-gallery) figure:nth-child(4) img", "alt", "ESIA18-ISSI2026会议交流活动现场"],
      [".conference-gallery:not(.defense-gallery) figure:nth-child(5) img", "alt", "ESIA18-ISSI2026大会报告现场"],
      ["#acta-tin-news-modal .paper-detail-figure img", "alt", "Acta Materialia 单晶锡微尺度塑性研究论文首页"],
      ["#ijms-tialnb-news-modal .paper-detail-figure img", "alt", "International Journal of Mechanical Sciences Ti₂AlNb 合金微力学研究论文首页"],
      ["#ijf-copper-news-modal .paper-detail-figure img", "alt", "International Journal of Fatigue 微尺度单晶铜疲劳研究论文首页"],
      ["#ijem-2d-materials-news-modal .paper-detail-figure img", "alt", "International Journal of Extreme Manufacturing 二维材料力学综述论文首页"],
      ["#nc-mxene-news-modal .paper-detail-figure img", "alt", "Nature Communications 二维材料剪切性能研究论文首页"],
    ],
  },
};

const originalTextNodes = new WeakMap();

const translateText = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return text;

  let translated = languageText[trimmed];
  const memberCount = trimmed.match(/^(\d+) 位成员$/);
  const peopleCount = trimmed.match(/^(\d+) 位$/);

  if (!translated && memberCount) translated = `${memberCount[1]} members`;
  if (!translated && peopleCount) translated = `${peopleCount[1]} people`;
  if (!translated) return text;

  return text.replace(trimmed, translated);
};

const localizeText = (text) => (currentLanguage === "en" ? translateText(text) : text);

const applyTextLanguage = (root) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
    const original = originalTextNodes.get(node);
    node.nodeValue = currentLanguage === "en" ? translateText(original) : original;
  });
};

const applyAttributeLanguage = () => {
  const settings = attributeTranslations[currentLanguage];
  document.documentElement.lang = currentLanguage === "en" ? "en" : "zh-CN";
  document.title = settings.title;
  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute("content", settings.description);
  settings.attributes.forEach(([selector, name, value]) => {
    document.querySelectorAll(selector).forEach((element) => element.setAttribute(name, value));
  });
};

const loadDeferredMedia = (root) => {
  if (!root) return;
  const media = [];
  if (root.matches?.("[data-src]")) media.push(root);
  media.push(...Array.from(root.querySelectorAll?.("[data-src]") || []));
  media.forEach((element) => {
    if (element.getAttribute("src")) return;
    element.setAttribute("src", element.dataset.src);
    if (element.tagName === "VIDEO") element.load?.();
  });
};

const applyLanguage = (root = document.body) => {
  applyAttributeLanguage();
  applyTextLanguage(root);
  document.querySelectorAll(".member-card[data-member-name]").forEach((card) => {
    const name = card.dataset.memberName || "";
    card.setAttribute(
      "aria-label",
      currentLanguage === "en" ? `Open details for ${languageText[name] || name}` : `展开${name}的详细信息`
    );
  });
  document.querySelectorAll(".member-avatar-photo[data-member-name]").forEach((image) => {
    const name = image.dataset.memberName || "";
    image.alt = currentLanguage === "en" ? `${languageText[name] || name} portrait` : `${name}头像`;
  });
  document.querySelectorAll(".member-avatar:not(.member-avatar-photo)[data-member-name]").forEach((avatar) => {
    const name = avatar.dataset.memberName || "";
    avatar.textContent = currentLanguage === "en" ? getEnglishInitials(name) : getMemberInitials(name);
  });
  languageButtons.forEach((button) => {
    const isActive = button.dataset.langOption === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

languageToggle?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang-option]");
  if (!button || button.dataset.langOption === currentLanguage) return;
  currentLanguage = button.dataset.langOption;
  applyLanguage();
});

const getOpenNewsModal = () => activeNewsModal || newsModals.find((modal) => !modal.hidden);

const openNewsModal = (modal) => {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  activeNewsModal = modal;
  loadDeferredMedia(modal);
  modal.hidden = false;
  document.body.classList.add("is-modal-open");
  modal.querySelector(".news-modal-close")?.focus();
};

const closeNewsModal = (modal = getOpenNewsModal()) => {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  if (activeNewsModal === modal) activeNewsModal = undefined;
  document.body.classList.remove("is-modal-open");
  lastFocusedElement?.focus?.();
};

newsModalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.dataset.newsModalOpen
      ? document.querySelector(button.dataset.newsModalOpen)
      : newsModals[0];
    openNewsModal(modal);
  });
});

newsModalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => closeNewsModal(button.closest("[data-news-modal]")));
});

const setPublicationFilter = (year) => {
  paperItems.forEach((item) => {
    const itemYear = item.querySelector(".paper-year")?.textContent.trim();
    const isOlderGroup = year === "2021-earlier" && Number(itemYear) <= 2021;
    item.hidden = !isOlderGroup && itemYear !== year;
  });

  publicationFilterButtons.forEach((button) => {
    const isActive = button.dataset.paperFilter === year;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

publicationFilterButtons.forEach((button) => {
  button.addEventListener("click", () => setPublicationFilter(button.dataset.paperFilter || "2026"));
});

setPublicationFilter("2026");

const openEasterEggModal = () => {
  if (!easterEggModal) return;
  lastFocusedElement = document.activeElement;
  loadDeferredMedia(easterEggModal);
  easterEggModal.hidden = false;
  document.body.classList.add("is-modal-open");
  if (easterEggVideo) {
    easterEggVideo.currentTime = 0;
    easterEggVideo.play?.().catch(() => {});
  }
  easterEggModal.querySelector(".easter-egg-close")?.focus();
};

const closeEasterEggModal = () => {
  if (!easterEggModal || easterEggModal.hidden) return;
  if (easterEggVideo) {
    easterEggVideo.pause?.();
    easterEggVideo.currentTime = 0;
  }
  easterEggModal.hidden = true;
  document.body.classList.remove("is-modal-open");
  lastFocusedElement?.focus?.();
};

easterEggButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    easterEggProgress = index === easterEggProgress ? easterEggProgress + 1 : index === 0 ? 1 : 0;
    if (easterEggProgress === easterEggButtons.length) {
      easterEggProgress = 0;
      openEasterEggModal();
    }
  });
});

easterEggCloseButtons.forEach((button) => button.addEventListener("click", closeEasterEggModal));

const closeSectionNavigator = () => {
  sectionNavigator?.classList.remove("is-open");
  sectionNavToggle?.setAttribute("aria-expanded", "false");
  sectionNavToggle?.setAttribute("aria-label", localizeText("展开章节导航"));
};

sectionNavToggle?.addEventListener("click", () => {
  const isOpen = sectionNavigator?.classList.toggle("is-open");
  sectionNavToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  sectionNavToggle.setAttribute("aria-label", localizeText(isOpen ? "收起章节导航" : "展开章节导航"));
});

sectionNavLinks.forEach((link) => {
  link.addEventListener("click", closeSectionNavigator);
});

const getMemberInitials = (name) => Array.from(name).slice(-2).join("");

const getEnglishInitials = (name) => {
  const englishName = languageText[name];
  if (!englishName) return getMemberInitials(name);
  return englishName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const getMemberTone = (name) =>
  Array.from(name).reduce((total, character) => total + character.charCodeAt(0), 0) % 6;

const createMemberAvatar = (member, large = false) => {
  if (member.photo) {
    const image = document.createElement("img");
    image.className = "member-avatar member-avatar-photo";
    image.src = member.photo;
    image.dataset.memberName = member.name;
    image.alt = currentLanguage === "en" ? `${languageText[member.name] || member.name} portrait` : `${member.name}头像`;
    image.loading = large ? "eager" : "lazy";
    image.decoding = "async";
    return image;
  }

  const avatar = document.createElement("div");
  avatar.className = `member-avatar tone-${getMemberTone(member.name)}`;
  avatar.dataset.memberName = member.name;
  avatar.textContent = currentLanguage === "en" ? getEnglishInitials(member.name) : getMemberInitials(member.name);
  avatar.setAttribute("aria-hidden", "true");
  return avatar;
};

const createDetailItem = (label, value) => {
  const wrapper = document.createElement("div");
  wrapper.className = "member-detail-item";

  const term = document.createElement("dt");
  term.textContent = label;
  wrapper.appendChild(term);

  const description = document.createElement("dd");
  description.textContent = value || "待补充";
  wrapper.appendChild(description);

  return wrapper;
};

const resetTeamDetail = (panel) => {
  const roster = panel?.querySelector("[data-team-list]");
  const detail = panel?.querySelector("[data-team-detail]");
  if (!roster || !detail) return;
  roster.hidden = false;
  detail.hidden = true;
  panel.classList.remove("is-viewing-member");
};

const activateTeamPanel = (group, resetDetails = true) => {
  if (!teamRoot) return;
  teamRoot.querySelectorAll("[data-team-group]").forEach((panel) => {
    const isActive = panel.dataset.teamGroup === group;
    panel.classList.toggle("is-active", isActive);
    panel.querySelector(".team-panel-header")?.setAttribute("aria-expanded", String(isActive));
    if (resetDetails && !isActive) resetTeamDetail(panel);
  });
};

const showMemberDetail = (group, member) => {
  if (!teamRoot) return;
  activateTeamPanel(group, false);
  const panel = teamRoot.querySelector(`[data-team-group="${group}"]`);
  const roster = panel?.querySelector("[data-team-list]");
  const detail = panel?.querySelector("[data-team-detail]");
  const content = detail?.querySelector("[data-team-detail-content]");
  if (!panel || !roster || !detail || !content) return;

  lastFocusedElement = document.activeElement;
  content.replaceChildren();

  const hero = document.createElement("div");
  hero.className = "member-detail-hero";
  hero.appendChild(createMemberAvatar(member, true));

  const heading = document.createElement("div");
  const name = document.createElement("h3");
  name.textContent = member.name;
  const level = document.createElement("p");
  level.textContent = member.level || "资料待补充";
  heading.append(name, level);
  hero.appendChild(heading);

  const details = document.createElement("dl");
  details.className = "member-detail-grid";
  const detailItems =
    group === "alumni"
      ? [
          createDetailItem("毕业去向", member.destination),
          createDetailItem("研究方向", member.research),
          createDetailItem("兴趣爱好", member.interests),
          createDetailItem("联系方式", member.contact, true),
        ]
      : [
          createDetailItem("研究方向", member.research),
          createDetailItem("兴趣爱好", member.interests),
          createDetailItem("当前状态", member.destination),
          createDetailItem("联系方式", member.contact, true),
        ];
  details.append(...detailItems);

  content.append(hero, details);
  applyLanguage(content);
  roster.hidden = true;
  detail.hidden = false;
  panel.classList.add("is-viewing-member");
  detail.scrollTop = 0;
  detail.querySelector("[data-team-back]")?.focus();
};

const createMemberCard = (group, member) => {
  const card = document.createElement("button");
  card.className = "member-card";
  card.type = "button";
  card.dataset.memberName = member.name;
  card.setAttribute(
    "aria-label",
    currentLanguage === "en"
      ? `Open details for ${languageText[member.name] || member.name}`
      : `展开${member.name}的详细信息`
  );
  card.appendChild(createMemberAvatar(member));

  const copy = document.createElement("span");
  copy.className = "member-card-copy";
  const name = document.createElement("strong");
  name.textContent = member.name;
  const level = document.createElement("span");
  level.textContent = group === "alumni" ? member.destination || "待补充" : member.level || "资料待补充";
  copy.append(name, level);

  const expandIcon = document.createElement("span");
  expandIcon.className = "member-card-expand";
  expandIcon.setAttribute("aria-hidden", "true");
  expandIcon.textContent = "↗";

  card.append(copy, expandIcon);
  card.addEventListener("click", () => showMemberDetail(group, member));
  return card;
};

const createDegreeColumn = (group, title, members) => {
  const column = document.createElement("section");
  column.className = "degree-column";

  const heading = document.createElement("div");
  heading.className = "degree-column-heading";
  const name = document.createElement("h3");
  name.textContent = title;
  const count = document.createElement("span");
  count.textContent = `${members.length} 位`;
  heading.append(name, count);

  const cards = document.createElement("div");
  cards.className = "degree-member-list";
  members.forEach((member) => cards.appendChild(createMemberCard(group, member)));

  column.append(heading, cards);
  return column;
};

const renderTeam = () => {
  if (!teamRoot || !window.teamMembers) return;

  Object.entries(window.teamMembers).forEach(([group, members]) => {
    const panel = teamRoot.querySelector(`[data-team-group="${group}"]`);
    const list = panel?.querySelector(`[data-team-list="${group}"]`);
    const count = teamRoot.querySelector(`[data-team-count="${group}"]`);
    if (!panel || !list) return;

    if (count) count.textContent = `${members.length} 位成员`;
    list.replaceChildren();

    if (group === "current") {
      const doctoralMembers = members.filter((member) => member.degree === "doctoral");
      const masterMembers = members.filter((member) => member.degree === "master");
      list.classList.add("is-degree-columns");
      list.append(
        createDegreeColumn(group, "博士 / 硕博研究生", doctoralMembers),
        createDegreeColumn(group, "硕士研究生", masterMembers)
      );
    } else {
      list.classList.remove("is-degree-columns");
      members.forEach((member) => list.appendChild(createMemberCard(group, member)));
    }

    panel.querySelector(".team-panel-header")?.addEventListener("click", () => {
      activateTeamPanel(group);
      resetTeamDetail(panel);
    });

    panel.querySelector("[data-team-back]")?.addEventListener("click", () => {
      resetTeamDetail(panel);
      lastFocusedElement?.focus?.({ preventScroll: true });
    });
  });
};

renderTeam();
applyLanguage();

guestbookForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = guestbookForm.querySelector(".guestbook-submit");
  const status = guestbookForm.querySelector("[data-form-status]");
  const formData = new FormData(guestbookForm);
  const payload = Object.fromEntries(formData.entries());

  submitButton.disabled = true;
  submitButton.textContent = "正在提交";
  guestbookForm.classList.remove("is-success", "is-error");
  if (status) status.textContent = "正在发送留言，请稍候。";

  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || `Form submission failed: ${response.status}`);

    guestbookForm.reset();
    guestbookForm.classList.add("is-success");
    if (status) status.textContent = "留言已收到，感谢您的来访。";
    submitButton.textContent = "提交成功";
  } catch (error) {
    guestbookForm.classList.add("is-error");
    if (status) {
      status.textContent =
        error.message === "MESSAGE_STORAGE_NOT_CONFIGURED"
          ? "留言后台正在配置，请稍后再试。"
          : "暂时未能提交，请检查网络后重试。";
    }
    submitButton.disabled = false;
    submitButton.textContent = "重新提交";
  }
});

document.addEventListener("click", (event) => {
  if (
    sectionNavigator?.classList.contains("is-open") &&
    !sectionNavigator.contains(event.target) &&
    !sectionNavToggle?.contains(event.target)
  ) {
    closeSectionNavigator();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && easterEggModal && !easterEggModal.hidden) {
    closeEasterEggModal();
    return;
  }
  const openNews = getOpenNewsModal();
  if (event.key === "Escape" && openNews) {
    closeNewsModal(openNews);
    return;
  }
  const openMemberDetail = teamRoot?.querySelector(".team-panel.is-viewing-member");
  if (event.key === "Escape" && openMemberDetail) {
    resetTeamDetail(openMemberDetail);
    lastFocusedElement?.focus?.({ preventScroll: true });
    return;
  }
  if (event.key === "Escape") closeSectionNavigator();
});

const showHeroSlide = (index) => {
  if (!heroSlides.length) return;
  activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
  loadDeferredMedia(heroSlides[activeHeroSlide]);
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeHeroSlide);
  });
  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeHeroSlide);
  });
};

const startHeroTimer = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || heroSlides.length < 2) return;
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => showHeroSlide(activeHeroSlide + 1), 5000);
};

const moveHeroSlide = (index) => {
  showHeroSlide(index);
  startHeroTimer();
};

heroPrev?.addEventListener("click", () => moveHeroSlide(activeHeroSlide - 1));
heroNext?.addEventListener("click", () => moveHeroSlide(activeHeroSlide + 1));
heroDots.forEach((dot) => {
  dot.addEventListener("click", () => moveHeroSlide(Number(dot.dataset.heroDot)));
});

startHeroTimer();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sections = sectionNavLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveSection = (sectionId) => {
  const targetHref = `#${sectionId}`;
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === targetHref);
  });
  sectionNavLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === targetHref;
    link.classList.toggle("active", isActive);
    if (isActive && sectionCurrent) {
      sectionCurrent.textContent = localizeText(link.dataset.sectionLabel || link.textContent.trim());
    }
  });
};

let sectionScrollFrame;
const updateActiveSection = () => {
  const marker = window.innerHeight * 0.38;
  let activeSection = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= marker) {
      activeSection = section;
    }
  });

  if (activeSection) setActiveSection(activeSection.id);
  sectionScrollFrame = undefined;
};

window.addEventListener(
  "scroll",
  () => {
    if (sectionScrollFrame) return;
    sectionScrollFrame = window.requestAnimationFrame(updateActiveSection);
  },
  { passive: true }
);

window.addEventListener("resize", updateActiveSection);
updateActiveSection();
