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
  "热烈祝贺苏婷同学顺利完成博士学位论文答辩，为自己的博士阶段画上圆满句点。":
    "Warm congratulations to Su Ting on successfully completing her doctoral dissertation defense and bringing her doctoral journey to a wonderful conclusion.",
  "答辩过程中，苏婷同学围绕二维材料力学性能与可靠性相关研究进行了系统汇报，充分展示了扎实的科研积累、严谨的学术态度和持续探索的研究精神。":
    "During the defense, Su Ting gave a systematic presentation on the mechanical properties and reliability of two-dimensional materials, demonstrating solid research training, rigorous academic thinking, and a spirit of sustained exploration.",
  "从课题攻关到论文写作，从实验分析到答辩展示，每一步都凝结着长期坚持与认真投入。祝愿苏婷同学在未来的科研与人生道路上继续保持热爱与笃定，步履从容，前程似锦，开启更加精彩的新篇章！":
    "From research challenges to dissertation writing, and from experimental analysis to the final defense, every step reflects long-term dedication and careful effort. We wish Su Ting continued passion and confidence in her future research and life, with a bright path ahead and many new chapters to come.",
  "苏婷同学作博士学位论文答辩报告": "Su Ting presenting her doctoral dissertation defense",
  "苏婷同学与闫亚宾老师合影": "Su Ting with Prof. Yabin Yan",
  "答辩现场合影": "Group photo after the defense",
  "万拾佳等在 Acta Materialia 发表单晶 β-Sn 微尺度塑性研究":
    "Wan Shijia et al. Report Microscale Plasticity of Single-Crystal β-Sn in Acta Materialia",
  "万拾佳等合作完成的研究论文“":
    "The research paper by Wan Shijia and collaborators, titled \"",
  "β-Sn 是电子互连中的典型低熔点、低对称性金属，其微尺度塑性同时受应变速率、加载方式和几何尺度影响。现有研究对位错滑移、蠕变损伤与应变梯度效应之间的耦合关系仍缺乏直接实验认识，限制了微纳互连结构的可靠性评价。":
    "β-Sn is a low-melting-point, low-symmetry metal widely used in electronic interconnects. Its microscale plasticity is governed by strain rate, loading mode, and geometric scale. Direct experimental understanding of the coupling among dislocation slip, creep damage, and strain-gradient effects remains limited, constraining reliability assessment of micro- and nanoscale interconnect structures.",
  "采用原位 SEM 微拉伸和微悬臂梁弯曲实验，对不同应变速率下单晶 β-Sn 的塑性变形进行对比研究，并结合表面滑移台阶、应变率敏感性和激活体积分析识别主导机制。":
    "In-situ SEM micro-tensile and micro-cantilever bending experiments were used to compare the plastic deformation of single-crystal β-Sn across strain rates. Surface slip steps, strain-rate sensitivity, and activation volume were further analyzed to identify the governing mechanisms.",
  "结果表明，高应变速率下变形主要由位错滑移控制，低应变速率下微拉伸试样出现明显蠕变损伤，而弯曲试样中的陡峭应力梯度会抑制损伤并诱发几何必要位错强化。该工作揭示了速率效应与变形梯度对单晶锡微尺度塑性的协同作用，为电子互连和微纳金属结构的寿命评价提供了实验依据。":
    "The results show that dislocation slip dominates at high strain rates. At low strain rates, micro-tensile specimens exhibit pronounced creep damage, while steep stress gradients in bending suppress damage and induce strengthening through geometrically necessary dislocations. The work establishes how rate effects and deformation gradients jointly govern the microscale plasticity of single-crystal tin and provides experimental evidence for lifetime assessment of electronic interconnects and micro- or nanoscale metallic structures.",
  "董亚辉、万拾佳等在 IJMS 发表 Ti₂AlNb 合金相间塑性研究":
    "Dong Yahui, Wan Shijia et al. Report Interphase Plasticity in Ti₂AlNb Alloys in IJMS",
  "董亚辉、万拾佳、王祎珩、苏婷等合作完成的研究论文“":
    "The research paper by Dong Yahui, Wan Shijia, Wang Yiheng, Su Ting, and collaborators, titled \"",
  "”发表在 ": "\", was published in ",
  "Ti₂AlNb 合金兼具低密度、比强度、抗蠕变和抗氧化性能，是面向航空高温构件的轻质候选材料。其 B2 相具有较好的塑性，O 相具有较高强度，两相之间的应力分配与滑移传递决定了合金的强塑性匹配，但小尺度下相界作用与尺寸效应仍缺乏定量认识。":
    "Ti₂AlNb alloys combine low density with high specific strength, creep resistance, and oxidation resistance, making them promising lightweight materials for high-temperature aerospace components. Their B2 phase provides ductility and their O phase provides strength. Stress partitioning and slip transfer between these phases control the strength-ductility balance, yet quantitative understanding of interphase effects and size dependence at small scales remains incomplete.",
  "制备直径为 1、2 和 3 μm 的双相微柱，利用原位 SEM 微柱压缩实验观察塑性变形，并建立双相晶体塑性有限元模型，分析不同 O 相分布和微柱尺寸下的相间力学耦合。":
    "Dual-phase micropillars with diameters of 1, 2, and 3 μm were fabricated. Plastic deformation was observed through in-situ SEM micropillar compression, and a dual-phase crystal plasticity finite-element model was developed to analyze mechanical coupling across O-phase distributions and pillar sizes.",
  "结果显示，微柱直径增大时屈服强度由 537.2 MPa 降至 278.5 MPa，塑性机制随尺寸发生转变。O 相取向、局部晶粒尺寸及两相滑移系的几何匹配共同控制应力集中和跨相滑移传递，B2/O 相间应力差随微柱尺寸增大而减弱。该研究为 Ti₂AlNb 合金的微结构调控与跨尺度力学建模提供了实验和计算依据。":
    "The yield strength decreases from 537.2 MPa to 278.5 MPa as pillar diameter increases, accompanied by a size-dependent transition in plasticity. O-phase orientation, local grain size, and geometric alignment of slip systems jointly control stress concentration and interphase slip transfer. The stress difference between B2 and O phases also decreases with increasing pillar size. These findings provide experimental and computational evidence for microstructure control and multiscale mechanical modeling of Ti₂AlNb alloys.",
  "王祎珩、万拾佳等在 IJF 发表微尺度单晶铜短裂纹研究":
    "Wang Yiheng, Wan Shijia et al. Report Fatigue Short Cracks in Microscale Single-Crystal Copper in IJF",
  "王祎珩、万拾佳等合作完成的研究论文“":
    "The research paper by Wang Yiheng, Wan Shijia, and collaborators, titled \"",
  "疲劳短裂纹的萌生与早期扩展占据微纳金属构件寿命的重要部分，但受试样制备和原位加载能力限制，现有实验认识主要来自宏观材料。微尺度短裂纹如何响应应变幅和加载频率，仍是微纳器件寿命预测中的关键问题。":
    "The initiation and early propagation of fatigue short cracks occupy a substantial portion of the lifetime of micro- and nanoscale metallic components. Experimental knowledge is still dominated by macroscale materials because specimen fabrication and in-situ loading remain difficult. The response of microscale short cracks to strain amplitude and loading frequency is therefore a central issue in lifetime prediction for micro- and nanoscale devices.",
  "对微尺度单晶铜开展应变控制原位 SEM 拉压疲劳实验，比较不同应变幅和加载频率下表面裂纹与内部裂纹的萌生、扩展和寿命分配，并利用分解剪应力的循环硬化与软化解释裂纹速率变化。":
    "Strain-controlled in-situ SEM tension-compression fatigue experiments were performed on microscale single-crystal copper. The initiation, propagation, and lifetime partitioning of surface and internal cracks were compared across strain amplitudes and loading frequencies, and variations in crack growth rate were related to cyclic hardening and softening of the resolved shear stress.",
  "结果表明，短裂纹扩展速率在萌生阶段附近达到较高水平，随后内部裂纹相对表面裂纹表现出传播滞后，且该行为受到应变幅和加载频率共同影响。裂纹萌生寿命与扩展寿命均符合 Manson-Coffin 关系，但对加载频率具有不同敏感性。该研究为微尺度金属疲劳损伤的分阶段表征和寿命模型构建提供了直接证据。":
    "The short-crack growth rate is high near initiation, followed by delayed propagation of internal cracks relative to surface cracks. This behavior is jointly controlled by strain amplitude and loading frequency. Both initiation life and propagation life follow Manson-Coffin relations, although their sensitivities to loading frequency differ. The study provides direct evidence for stage-resolved characterization and lifetime modeling of fatigue damage in microscale metals.",
  "苏婷、荣超等在 IJEM 发表二维材料力学测试与机制综述":
    "Su Ting, Chao Rong et al. Publish a Review of Mechanical Testing and Mechanisms of Two-Dimensional Materials in IJEM",
  "苏婷、荣超等合作完成的综述论文“":
    "The review by Su Ting, Chao Rong, and collaborators, titled \"",
  "二维材料的原子级厚度使其力学测试高度依赖样品质量、转移过程和原位表征条件。污染、残余应力、边缘缺陷及测试平台差异都可能造成测量偏差，现有研究中材料转移与实验方案之间仍缺少系统匹配原则。":
    "The atomic-scale thickness of two-dimensional materials makes mechanical testing highly sensitive to sample quality, transfer processes, and in-situ characterization conditions. Contamination, residual stress, edge defects, and differences among testing platforms can all bias measurements. Systematic principles for matching material transfer with experimental design remain underdeveloped.",
  "系统梳理二维材料的湿法、干法和确定性转移技术，以及基于 AFM、SEM 和 TEM 的原位力学测试方法，比较不同技术的适用条件与误差来源，并总结断裂行为、几何尺寸效应、边缘缺陷和层间结合机制。":
    "Wet, dry, and deterministic transfer methods for two-dimensional materials were systematically reviewed together with in-situ mechanical testing based on AFM, SEM, and TEM. The operating conditions and error sources of these techniques were compared, and current understanding of fracture behavior, geometric size effects, edge defects, and interlayer bonding was synthesized.",
  "该综述建立了从材料特性、转移质量到测试策略的完整分析框架，为研究人员选择适配的样品制备和力学表征方案提供指导，也为连接二维材料微观结构、力学响应与器件可靠性提供了系统认识。":
    "The review establishes an integrated framework linking material characteristics, transfer quality, and testing strategy. It guides the selection of compatible sample preparation and mechanical characterization methods and provides a systematic basis for connecting microstructure, mechanical response, and device reliability in two-dimensional materials.",
  "苏婷、荣超和余天昊等在 Nature Communications 发表二维 MXene 剪切性能研究":
    "Su Ting, Chao Rong, Tianhao Yu et al. Report the Shear Properties of Two-Dimensional MXene in Nature Communications",
  "苏婷、荣超和余天昊等合作完成的研究论文“":
    "The research paper by Su Ting, Chao Rong, Tianhao Yu, and collaborators, titled \"",
  "二维 Ti₃C₂Tₓ MXene 兼具优异力学性能、金属导电性和溶液加工能力，在航空航天、智能传感、柔性电子及微纳机电系统中具有应用潜力。已有研究主要关注其单轴拉伸行为，受微纳测试方法限制，单层材料在面内剪切载荷下的本征力学性能和起皱稳定性长期缺少直接测量。":
    "Two-dimensional Ti₃C₂Tₓ MXene combines exceptional mechanical properties, metallic conductivity, and solution processability, supporting potential applications in aerospace systems, intelligent sensors, flexible electronics, and micro- or nanoelectromechanical systems. Previous work has focused primarily on uniaxial tension. Limitations in micro- and nanomechanical testing have left the intrinsic in-plane shear properties and wrinkle stability of monolayers without direct measurement.",
  "提出 Push-to-Shear 原位测试策略，构建定向剪切器件，在 SEM 中实现单层 Ti₃C₂Tₓ 纳米片的直接面内剪切加载，并结合分子动力学模拟、第一性原理计算和电子显微表征分析变形与损伤机制。":
    "An in-situ Push-to-Shear strategy and a directional shear device were developed for direct in-plane loading of monolayer Ti₃C₂Tₓ nanosheets inside an SEM. Molecular dynamics simulations, first-principles calculations, and electron microscopy were combined to analyze deformation and damage mechanisms.",
  "结果表明，单晶单层 Ti₃C₂Tₓ 的面内剪切模量达到 0.279 ± 0.007 TPa，剪切强度约为 18.6 GPa，平均剪切应变约为 8.6%，同时保持稳定的抗皱能力。研究进一步揭示了局部非均匀变形累积与原子层间强键合作用对剪切损伤和面外稳定性的影响，为二维柔性电子与微纳器件的结构设计和可靠性评价提供了直接实验依据。":
    "Single-crystal monolayer Ti₃C₂Tₓ exhibits an in-plane shear modulus of 0.279 ± 0.007 TPa, a shear strength of approximately 18.6 GPa, and an average shear strain of approximately 8.6%, while maintaining stable wrinkle resistance. The study further identifies the roles of localized nonuniform deformation and strong bonding between atomic layers in shear damage and out-of-plane stability. These results provide direct experimental evidence for structural design and reliability assessment of two-dimensional flexible electronics and micro- or nanoscale devices.",
  "恭喜23级五位硕士毕业生顺利毕业": "Congratulations to the Five 2023 Master's Graduates",
  "恭喜王祎珩、吴昊、董亚辉、徐渝京、史春浩顺利毕业，预祝苏婷顺利毕业！":
    "Congratulations to Wang Yiheng, Wu Hao, Dong Yahui, Xu Yujing, and Shi Chunhao on their graduation. Best wishes to Su Ting for a successful graduation ahead.",
  "苏婷、万拾佳赴英国格拉斯哥参加第18届工程结构完整性评估国际会议":
    "Su Ting and Wan Shijia Attended the 18th International Conference on Engineering Structural Integrity Assessment",
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
  "原文链接：": "Original article: ",
  "论文首页：": "Article front page: ",
  "课题组赴无锡开展春日团建活动": "Research Group Spring Outing in Wuxi",
  "2024 年 4 月，课题组师生前往无锡，在惠山国家森林公园、惠山古镇与南长街度过了一段轻松愉快的春日时光。":
    "In April 2024, the group traveled to Wuxi for a relaxed spring outing at Huishan National Forest Park, Huishan Ancient Town, and Nanchang Street.",
  "大家在惠山国家森林公园沿途赏春、登高远眺，在山间留下集体合影；随后漫步惠山古镇，感受江南街巷的悠闲氛围。":
    "The group enjoyed the spring scenery and a hill walk in Huishan National Forest Park, then explored Huishan Ancient Town and its relaxed Jiangnan streetscape.",
  "当天的行程也延续至南长街。一路上的交流、笑声与合影，为紧张有序的科研生活增添了轻松的节奏，也让课题组的伙伴情谊更加紧密。":
    "The outing continued at Nanchang Street. Conversations, laughter, and shared photos brought a lighter rhythm to research life and strengthened the group's camaraderie.",
  "惠山国家森林公园合影": "Group photo at Huishan National Forest Park",
  "南长街春日留影": "Spring photo at Nanchang Street",
  "惠山国家森林公园留影": "Photo at Huishan National Forest Park",
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
      ["#nc-mxene-news-modal .paper-detail-figure img", "alt", "Nature Communications cover for the shear properties of two-dimensional MXene"],
      ["#wuxi-spring-outing-news-modal .outing-gallery figure:nth-child(1) img", "alt", "Group photo at Huishan National Forest Park"],
      ["#wuxi-spring-outing-news-modal .outing-gallery figure:nth-child(2) img", "alt", "Group photo at Nanchang Street"],
      ["#wuxi-spring-outing-news-modal .outing-gallery figure:nth-child(3) img", "alt", "Group photo at Huishan National Forest Park"],
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
      ["#nc-mxene-news-modal .paper-detail-figure img", "alt", "Nature Communications 二维 MXene 剪切性能研究论文封面"],
      ["#wuxi-spring-outing-news-modal .outing-gallery figure:nth-child(1) img", "alt", "课题组在惠山国家森林公园合影"],
      ["#wuxi-spring-outing-news-modal .outing-gallery figure:nth-child(2) img", "alt", "课题组在南长街合影"],
      ["#wuxi-spring-outing-news-modal .outing-gallery figure:nth-child(3) img", "alt", "课题组在惠山国家森林公园留影"],
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
