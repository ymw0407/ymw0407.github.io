import { absoluteSiteUrl } from '../utils/social';

export type Language = 'ko' | 'en';

export interface BilingualText {
  ko: string;
  en: string;
}

export interface ResearchTopic {
  id: string;
  title: BilingualText;
  status: 'exploring' | 'prior' | 'archived' | 'study';
  statusLabel: BilingualText;
  summary: BilingualText;
  keywords: string[];
  presentationPdfUrl?: string;
  presentationTitle?: BilingualText;
  links?: {
    label: BilingualText;
    url: string;
  }[];
  referencesNote?: BilingualText;
  references?: {
    title: string;
    venueOrNote: string;
    url: string;
  }[];
}

export interface LabExperience {
  id: string;
  labName: BilingualText;
  institution: BilingualText;
  role: BilingualText;
  period: BilingualText;
  labUrl: string;
  location: BilingualText;
  overview: BilingualText;
  topics: ResearchTopic[];
}

export interface Publication {
  id: string;
  type: 'journal' | 'conference';
  badge: BilingualText;
  titleEn: string;
  titleKo: string;
  authors: { name: string; isMe?: boolean }[];
  venue: string;
  volumePages: string;
  date: string;
  doi?: string;
  award?: BilingualText;
  lineageNote: BilingualText;
  bibtex: string;
}

export interface AwardItem {
  date: string;
  title: BilingualText;
  organization: BilingualText;
  project: string;
  roleOrNote: BilingualText;
}

export interface ProgramActivityItem {
  period: string;
  title: BilingualText;
  roleOrNote: BilingualText;
  category: 'research-program' | 'open-source' | 'selection' | 'community';
  link?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  subtitle: BilingualText;
  period: string;
  role: BilingualText;
  repoUrl?: string;
  isArchivedRepo?: boolean;
  presentationPdfUrl?: string;
  presentationTitle?: BilingualText;
  techStack: string[];
  description: BilingualText;
  highlights: {
    ko: string[];
    en: string[];
  };
  relatedBadge?: BilingualText;
}

export interface WorkExperienceItem {
  company: BilingualText;
  role: BilingualText;
  badgeLabel?: BilingualText;
  periods: BilingualText[];
  techStack: string[];
  summary: BilingualText;
  bullets: {
    ko: string[];
    en: string[];
  };
}

export interface TimelineMilestone {
  id: string;
  period: BilingualText;
  category: 'research' | 'engineering' | 'publication' | 'honor';
  categoryLabel: BilingualText;
  title: BilingualText;
  organization: BilingualText;
  description: BilingualText;
  tags: string[];
  highlightBadge?: BilingualText;
}

export interface PaperReadingItem {
  id: string;
  status: 'reading' | 'completed';
  statusLabel: BilingualText;
  category: 'Storage & Kernel I/O' | 'Computer Architecture & FHE' | 'Systems & Open Source';
  title: string;
  authorsOrGroup: string;
  venue: string;
  year: string;
  takeaway: BilingualText;
  tags: string[];
  paperUrl?: string;
  relatedPostSlug?: string;
}

export interface CertificationItem {
  name: BilingualText;
  date: string;
  issuer: BilingualText;
  category: 'cloud-sys' | 'sw-data';
}

export interface PhotoArchiveItem {
  id: string;
  titleKo: string;
  titleEn: string;
  award: BilingualText;
  issuer: BilingualText;
  date: string;
  imagePath: string;
}

export const PROFILE_DATA = {
  name: {
    ko: '윤민우 (Minwoo Yun)',
    en: 'Minwoo Yun',
  },
  nickname: {
    ko: 'sinav (시나브)',
    en: 'sinav',
  },
  shortName: {
    ko: '윤민우 (sinav)',
    en: 'Minwoo Yun (sinav)',
  },
  slogan: {
    ko: '익숙한 답보다, 더 나은 가능성을 탐구합니다.',
    en: 'Exploring Beyond the Expected.',
  },
  logoMotto: {
    ko: 'Find My Way. Leave a Trace.',
    en: 'Find My Way. Leave a Trace.',
  },
  headline: {
    ko: 'Operating Systems, Storage Systems & Computer Architecture Researcher',
    en: 'Operating Systems, Storage Systems & Computer Architecture Researcher',
  },
  affiliation: {
    ko: '국민대학교 Memory & Storage Lab · UC Irvine BIAS Lab 학부연구생',
    en: 'Undergraduate Researcher @ Memory & Storage Lab (Kookmin Univ.) & BIAS Lab (UC Irvine)',
  },
  bio: {
    ko: '어려운 문제를 이해하고, 기존의 한계를 넘어서는 방법을 찾는 과정에서 즐거움을 느낍니다. 서비스를 개발하며 쌓은 경험을 바탕으로, 현재 국민대학교 Memory & Storage Lab과 UC Irvine BIAS Lab에서 운영체제와 스토리지, 시스템 소프트웨어의 동작 원리를 탐구하고 더 효율적인 시스템을 만드는 데 관심을 두고 있습니다. 기술적 성취에 머무르지 않고, 제가 만든 결과가 함께하는 사람들에게도 긍정적인 영향을 남기기를 바랍니다.',
    en: 'I find joy in understanding difficult problems and discovering ways to move beyond existing limitations. Building on hands-on service development experience, I now investigate the inner workings of operating systems, storage, and system software at Kookmin University (Memory & Storage Lab) and UC Irvine (BIAS Lab) to build more efficient systems. Rather than stopping at technical achievement alone, I hope the results I create leave a positive impact for the people I work with.',
  },
  interests: [
    {
      ko: 'Linux Kernel I/O Stack (io_uring, Block Layer)',
      en: 'Linux Kernel I/O Stack (io_uring, Block Layer)',
    },
    {
      ko: 'Flash Storage Systems (NVMe, NAND Characteristics)',
      en: 'Flash Storage Systems (NVMe, NAND Characteristics)',
    },
    {
      ko: 'Privacy-Preserving ML & FHE Acceleration',
      en: 'Privacy-Preserving ML & FHE Acceleration',
    },
    {
      ko: 'Memory-Centric Computer Architecture',
      en: 'Memory-Centric Computer Architecture',
    },
    {
      ko: 'Open-Source Infrastructure & Developer Tooling',
      en: 'Open-Source Infrastructure & Developer Tooling',
    },
  ],
  links: {
    github: 'https://github.com/ymw0407',
    linkedin: 'https://www.linkedin.com/in/ymw0407/',
    instagram: 'https://www.instagram.com/ymw0407/',
    email: 'mailto:sinav.dev@gmail.com',
    mslLab: 'https://yongsoojoo.github.io/index.html',
    biasLab: 'https://biaslab.ics.uci.edu/',
    ioUringStudy: absoluteSiteUrl('/system_io_uring_study/'),
  },
  philosophy: {
    summary: {
      ko: '추상화를 활용하되, 그 아래의 구조를 잊지 않으려 합니다.\n속도가 중요한 시대일수록 통제 가능한 복잡성을 설계하는 것이 엔지니어와 연구자의 역할이라고 믿습니다.\n이해하지 못한 기반 위에 시스템을 오래 두지 않으려 합니다.',
      en: 'I leverage abstractions while never losing sight of the underlying structure.\nIn an era obsessed with speed, I believe our role is to design controllable complexity, and never leave systems resting on foundations we do not truly understand.',
    },
    ethics: {
      ko: '추상화와 AI를 활용하지만, 판단과 책임은 스스로 진다.\n모든 것을 알 필요는 없지만, 실패는 예측 가능해야 한다고 믿는다.\n나는 통제 가능한 복잡성을 설계하려 한다.',
      en: 'Use abstractions and AI, but own the judgment and responsibility.\nWe need not know everything, but failures must be predictable.\nI strive to design controllable complexity.',
    },
  },
  narrative: {
    title: {
      ko: '기능 구현에서 출발해, 시스템의 구조와 제약을 탐구하는 연구자로',
      en: 'From Feature Implementation to Investigating System Structures & Constraints',
    },
    paragraphs: {
      ko: [
        '처음 개발을 시작했을 때는 머릿속의 아이디어를 실제로 구현해 결과물을 만들어내는 과정 자체가 가장 큰 동기였습니다. 하지만 첫 프로젝트였던 webOS 기반 월패드 플랫폼(Home++)을 진행하면서, 단순한 기능 구현보다 플랫폼이 가진 제약을 분석하고 그 안에서 가능한 해결 방법을 찾는 과정에 더 큰 흥미를 느끼게 되었습니다. 실제로 LS2 API의 동작 방식과 권한 구조를 분석했고, API 동작 문제를 발견해 버그 리포트를 제출하기도 했습니다.',
        '이후 여러 서버 중심 프로젝트와 Open-Set-Go 프로젝트를 수행하며, 서로 다른 서비스임에도 유사한 데이터 흐름과 아키텍처 패턴이 반복된다는 점을 인식했습니다. Git 워크플로우, CI/CD 파이프라인, 프로젝트 운영 구조를 설계하면서 개별 기능 구현을 넘어 시스템 전체를 하나의 구조로 바라보는 사고방식이 저에게 가장 잘 맞는다는 것을 확인했습니다.',
      ],
      en: [
        'When I first started building software, turning ideas into tangible products was my biggest motivation. However, during my first major project, the webOS-based smart wall-pad platform (Home++), I discovered a much deeper fascination in analyzing platform constraints and finding structural solutions within them, including dissecting LS2 API permission internals and filing upstream bug reports.',
        'Through subsequent backend projects and leading Open-Set-Go, I recognized recurring architectural patterns and data flows across seemingly different services. Designing Git workflows, CI/CD pipelines, and operational governance confirmed that my natural strength lies in viewing systems holistically as interconnected structures.',
      ],
    },
    questionsIntro: {
      ko: '경험이 쌓일수록 저는 자연스럽게 추상화 계층 너머를 향해 다음과 같은 질문을 던지게 되었습니다:',
      en: 'As my engineering experience grew, I naturally began asking fundamental questions reaching beneath the abstraction layers:',
    },
    questions: {
      ko: [
        '시스템과 하드웨어는 어떤 전제 위에서 동작하는가?',
        '커널과 아키텍처의 구조적 선택이 성능과 안정성에 어떤 영향을 미치는가?',
        '작업을 어떻게 분할하고 I/O 및 메모리 데이터 흐름을 설계해야 하는가?',
      ],
      en: [
        'Under what foundational assumptions do the OS and hardware operate?',
        'How do structural choices in the kernel and architecture shape latency and reliability?',
        'How should workloads be partitioned and data flows across I/O and memory be designed?',
      ],
    },
    closing: {
      ko: '이러한 질문들은 자연스럽게 추상화 아래의 운영체제 커널 I/O 스택(io_uring), 플래시 스토리지 시스템(NVMe/NAND), 그리고 메모리 중심 컴퓨터 아키텍처 연구로 이어졌습니다. 앞으로도 코드 구현 이전에 시스템의 구조와 제약을 먼저 파고들어 설계로 문제를 해결하는 시스템 연구자로 성장하고자 합니다.',
      en: 'These questions naturally led me beneath high-level abstractions into researching the Linux kernel I/O stack (io_uring), flash storage systems (NVMe/NAND), and memory-centric computer architectures. I aim to grow as a systems researcher who understands foundational constraints before writing code.',
    },
  },
  education: {
    school: { ko: '국민대학교 (Kookmin University)', en: 'Kookmin University' },
    degree: { ko: '소프트웨어융합대학 소프트웨어전공 (학사과정)', en: 'B.S. in Software, College of Computer Science' },
    period: { ko: '2022.03 – 현재', en: 'Mar 2022 – Present' },
    description: {
      ko: '컴퓨터 과학을 단순한 추상화의 집합이 아니라, 구조를 이해하기 위한 도구로 배우고 있습니다. 운영체제와 네트워크, 스토리지 데이터 흐름에 관심을 두며 확장 가능하고 통제 가능한 시스템을 설계하는 것을 목표로 연구하고 있습니다.',
      en: 'Studying computer science not merely as a collection of abstractions, but as a lens to understand underlying structures, focusing on operating systems, storage I/O data flows, and computer architecture.',
    },
  },
};

export const LAB_EXPERIENCES: LabExperience[] = [
  {
    id: 'kmu-msl',
    labName: {
      ko: 'Memory & Storage Laboratory (MSL)',
      en: 'Memory & Storage Laboratory (MSL)',
    },
    institution: {
      ko: '국민대학교 (Kookmin University)',
      en: 'Kookmin University',
    },
    role: {
      ko: '학부연구생 (Undergraduate Researcher)',
      en: 'Undergraduate Researcher',
    },
    period: {
      ko: '2026년 2학기 – 현재',
      en: 'Fall 2026 – Present',
    },
    labUrl: 'https://yongsoojoo.github.io/index.html',
    location: {
      ko: 'Seoul, Republic of Korea',
      en: 'Seoul, Republic of Korea',
    },
    overview: {
      ko: '리눅스 커널 I/O 서브시스템 및 플래시 스토리지 시스템 특성을 연구합니다. (현재 진행 중인 연구 주제는 논문 투고 전까지 세부 아이디어를 비공개로 관리하며, 공개 아카이브된 이전 탐색 주제와 시스템 스터디만 아래에 기록합니다.)',
      en: 'Researching the Linux kernel I/O subsystem and flash storage systems. (Specific ongoing research ideas remain confidential prior to publication; only publicly archived explorations and technical studies are listed below.)',
    },
    topics: [
      {
        id: 'nand-read-granularity',
        title: {
          ko: 'NAND 읽기 단위 불일치 분석 및 잔여 센싱 데이터 재사용 탐색',
          en: 'NAND Read Granularity Mismatch & Residual Sensed Data Reuse',
        },
        status: 'archived',
        statusLabel: {
          ko: '탐색 종료 및 아카이브 보존',
          en: 'Archived Exploration (Discontinued)',
        },
        summary: {
          ko: '호스트 읽기 요청 크기와 NAND 플래시 센싱 단위 간의 불일치를 분석하고, NAND 레지스터에 이미 센싱된 미사용 데이터를 유지·재사용할 수 있는지 검토했습니다. 한계점 분석 및 중단 사유, 실험 코드와 데이터를 연구 아카이브에 보존했습니다.',
          en: 'Studied the mismatch between host read request sizes and NAND sensing granularity, analyzing whether residual data sensed into NAND registers could be retained and reused. Preserved the code, inputs, limitations, and reasons for discontinuation in a research archive.',
        },
        keywords: ['NAND Flash', 'Read Granularity', 'Page Register', 'Storage Architecture'],
      },
      {
        id: 'io-uring-dpas-study',
        title: {
          ko: '고성능 비동기 I/O (io_uring) 및 동적 I/O 완료(DPAS) 심층 연구 스터디',
          en: 'Systems Study: Linux io_uring & Dynamic I/O Completion (DPAS)',
        },
        status: 'study',
        statusLabel: {
          ko: '시스템 심층 스터디 & 벤치마크',
          en: 'Technical Study & Interactive Visualization',
        },
        summary: {
          ko: '리눅스 비동기 I/O 인터페이스인 io_uring의 Submission/Completion Ring 아키텍처, 커널 코드 경로, 벤치마크 스크립트 및 인터랙티브 시각화를 구축했습니다. 아울러 연구실의 폴링 및 인터럽트 기반 동적 I/O 완료(DPAS) 기법을 학습·분석했습니다.',
          en: 'Built an in-depth technical study repository and interactive visualization website for Linux io_uring, including benchmark scripts and kernel path analysis, alongside studying the lab’s dynamic polling/interrupt I/O completion (DPAS) work.',
        },
        keywords: ['io_uring', 'DPAS', 'Linux Kernel I/O'],
        links: [
          {
            label: { ko: '스터디 웹', en: 'Study Site' },
            url: PROFILE_DATA.links.ioUringStudy,
          },
          {
            label: { ko: 'GitHub', en: 'GitHub' },
            url: 'https://github.com/ymw0407/system_io_uring_study',
          },
        ],
      },
    ],
  },
  {
    id: 'uci-bias',
    labName: {
      ko: 'Bio-Inspired Architecture and Systems Lab (BIAS Lab)',
      en: 'Bio-Inspired Architecture and Systems Lab (BIAS Lab)',
    },
    institution: {
      ko: 'University of California, Irvine (UC Irvine)',
      en: 'University of California, Irvine (UC Irvine)',
    },
    role: {
      ko: '학부 방문연구생 및 공동연구 (Visiting & Collaborative Researcher · GREAT Program)',
      en: 'Undergraduate Visiting & Collaborative Researcher (incl. 2026 GREAT Program)',
    },
    period: {
      ko: '2026.05 – 현재 (방문연구 후 연구 지속 중)',
      en: 'May 2026 – Present (Ongoing Research)',
    },
    labUrl: 'https://biaslab.ics.uci.edu/',
    location: {
      ko: 'Irvine, CA, USA (Remote Collaboration Ongoing)',
      en: 'Irvine, CA, USA (Remote Collaboration Ongoing)',
    },
    overview: {
      ko: '2026 UC Irvine GREAT 프로그램 학부 방문연구에서 출발해 현재까지 후속 연구 프로젝트를 지속하고 있습니다. (현재 진행 중인 연구 프로젝트는 논문 투고 전까지 세부 주제를 비공개로 관리하며, 공개 발표 및 탐색이 완료된 연구와 배경 문헌 스터디만 아래에 기록합니다.)',
      en: 'Started as an undergraduate visiting researcher in the 2026 UC Irvine GREAT Program and continuing collaborative research projects to the present. (Specific ongoing research projects preparing for submission remain confidential; only publicly presented/concluded explorations and background literature studies are listed below.)',
    },
    topics: [
      {
        id: 'fhe-encrypted-dl',
        title: {
          ko: 'Accelerating Secure Deep Learning with Fully Homomorphic Encryption (GREAT Symposium 발표 · 탐색 종료)',
          en: 'Accelerating Secure Deep Learning with Fully Homomorphic Encryption (GREAT Symposium · Concluded)',
        },
        status: 'archived',
        statusLabel: {
          ko: 'GREAT Symposium 발표 · 탐색 종료',
          en: 'GREAT Symposium Presentation · Concluded',
        },
        summary: {
          ko: '2026 UC Irvine GREAT Program Symposium에서 발표한 연구로(지도: Prof. Mohsen Imani, 멘토: Sanggeon Yun), 완전동형암호(FHE) 추론의 주 병목인 부트스트래핑(Bootstrapping) 횟수를 줄이기 위해 연속 블록을 압축하는 Network Folding(6 블록 기준 12배 가속)과, 추가 부트스트래핑 없이 모델 용량 손실을 보완하는 병렬 Memory-Centric Architecture(Product Keys, 2 블록 기준 평균 +4.0%p 정확도 회복)를 실험·분석했습니다.',
          en: 'Presented at the 2026 UC Irvine GREAT Program Symposium (Advisor: Prof. Mohsen Imani, Mentor: Sanggeon Yun). Investigated combining Network Folding (12x faster ciphertext inference at 6 blocks) with a parallel Memory-Centric Architecture (Product Keys) that recovers +4.0%p accuracy on average at 2 blocks while adding zero extra bootstrappings.',
        },
        keywords: ['FHE', 'Network Folding', 'Memory-Centric Architecture', 'UCI GREAT Symposium'],
        presentationPdfUrl: '/presentations/uci-great-2026-fhe-symposium.pdf',
        presentationTitle: {
          ko: '2026 UC Irvine GREAT Program Symposium 발표 슬라이드 (18p PDF)',
          en: '2026 UC Irvine GREAT Program Symposium Presentation Slides (18p PDF)',
        },
        links: [
          {
            label: { ko: '심포지엄 발표 PDF', en: 'Symposium Slides (PDF)' },
            url: '/presentations/uci-great-2026-fhe-symposium.pdf',
          },
        ],
        referencesNote: {
          ko: '발표에서 인용·분석한 핵심 배경 논문 (Background literature cited in presentation):',
          en: 'Key background literature cited and analyzed in the presentation:',
        },
        references: [
          {
            title: 'Large Memory Layers with Product Keys',
            venueOrNote: 'Lample et al., NeurIPS 2019 (arXiv:1907.05242) · Parallel memory-layer architecture',
            url: 'https://arxiv.org/abs/1907.05242',
          },
          {
            title: 'Homomorphic Encryption for Arithmetic of Approximate Numbers (CKKS)',
            venueOrNote: 'Cheon et al., ASIACRYPT 2017 · Approximate arithmetic FHE scheme',
            url: 'https://eprint.iacr.org/2016/421',
          },
          {
            title: 'OpenFHE: Open-Source Fully Homomorphic Encryption Library',
            venueOrNote: 'Al Badawi et al., WAHC 2022 · Open-source FHE implementation',
            url: 'https://eprint.iacr.org/2022/915',
          },
          {
            title: 'Cheddar: A Swift Fully Homomorphic Encryption Library for CUDA GPUs',
            venueOrNote: 'arXiv:2407.13055 · GPU-oriented FHE library',
            url: 'https://arxiv.org/abs/2407.13055',
          },
          {
            title: 'EncryptedLLM: GPU-Accelerated FHE for Privacy-Preserving LLM Inference',
            venueOrNote: 'PMLR v267 · Privacy-preserving language model inference',
            url: 'https://proceedings.mlr.press/v267/de-castro25a.html',
          },
        ],
      },
    ],
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'ktcp-2024-open-set-go',
    type: 'journal',
    badge: {
      ko: '국내학술지 (KCI 등재 · 확장 논문)',
      en: 'Journal Article · Extended Edition',
    },
    titleEn:
      'Project Generation and Operating Management Service for Mitigating Barriers to Entry into Open Source Operations',
    titleKo: '오픈소스 운영 진입장벽 완화를 위한 프로젝트 생성 및 운영 관리 서비스',
    authors: [
      { name: 'Minwoo Yun', isMe: true },
      { name: 'Minsuk Lee' },
    ],
    venue: 'KIISE Transactions on Computing Practices (정보과학회 컴퓨팅의 실제 논문지)',
    volumePages: 'Vol. 30, No. 10, pp. 499–505',
    date: 'October 2024',
    doi: 'https://doi.org/10.5626/KTCP.2024.30.10.499',
    lineageNote: {
      ko: '제1저자 (First Author) · KSC 2023 최우수논문상 수상 학술대회 논문의 확장 학술지 버전 (동일 연구 계보)',
      en: 'First Author · Extended journal version of the KSC 2023 Best Paper Award conference publication (connected research lineage)',
    },
    bibtex: `@article{yun2024project,
  title={Project Generation and Operating Management Service for Mitigating Barriers to Entry into Open Source Operations},
  author={Yun, Minwoo and Lee, Minsuk},
  journal={KIISE Transactions on Computing Practices},
  volume={30},
  number={10},
  pages={499--505},
  year={2024},
  month={oct},
  doi={10.5626/KTCP.2024.30.10.499}
}`,
  },
  {
    id: 'ksc-2023-open-set-go',
    type: 'conference',
    badge: {
      ko: '학술대회 논문 (최우수논문상)',
      en: 'Conference Paper · Best Paper Award',
    },
    titleEn:
      'Open-Source Project Generation and Operating Management Service for Mitigating Barriers to Entry into Open-Source Operations',
    titleKo: '오픈소스 운영 진입장벽 완화를 위한 오픈소스 프로젝트 생성 및 운영 관리 서비스',
    authors: [
      { name: 'Minwoo Yun', isMe: true },
      { name: 'Chaeyeong An' },
      { name: 'Jinwoo Park' },
      { name: 'Chaeyeong Yi' },
      { name: 'Sinji Yun' },
      { name: 'Jiyun Kim' },
      { name: 'Minsuk Lee' },
    ],
    venue: 'Proceedings of Korea Software Congress 2023 (KSC 2023 / 한국소프트웨어종합학술대회)',
    volumePages: 'pp. 425–427',
    date: 'December 2023',
    award: {
      ko: 'KSC 2023 오픈소스소프트웨어 분야 최우수논문상 (한국정보과학회 회장상)',
      en: 'Best Paper Award in Open-Source Software Track (President of KIISE)',
    },
    lineageNote: {
      ko: '제1저자 (First Author) · 후속 확장 논문이 KTCP 2024 (30권 10호)에 게재됨',
      en: 'First Author · Subsequently extended and published in KIISE Transactions on Computing Practices (Oct 2024)',
    },
    bibtex: `@inproceedings{yun2023opensource,
  title={Open-Source Project Generation and Operating Management Service for Mitigating Barriers to Entry into Open-Source Operations},
  author={Yun, Minwoo and An, Chaeyeong and Park, Jinwoo and Yi, Chaeyeong and Yun, Sinji and Kim, Jiyun and Lee, Minsuk},
  booktitle={Proceedings of Korea Software Congress (KSC 2023)},
  pages={425--427},
  year={2023}
}`,
  },
];

export const TECHNICAL_AWARDS: AwardItem[] = [
  {
    date: '2023.12.21',
    title: {
      ko: '2023 한국소프트웨어종합학술대회(KSC 2023) 오픈소스소프트웨어 분야 최우수논문상',
      en: 'Best Paper Award (Open-Source Software Track), Korea Software Congress (KSC 2023)',
    },
    organization: {
      ko: '한국정보과학회 회장상 (President of KIISE)',
      en: 'President of KIISE (Korean Institute of Information Scientists and Engineers)',
    },
    project: 'Open-Set-Go',
    roleOrNote: {
      ko: '제1저자 (First Author)',
      en: 'First Author',
    },
  },
  {
    date: '2023.12.01',
    title: {
      ko: '2023년 공개SW 개발자대회 학생부문 은상',
      en: 'Silver Prize (Student Division), 2023 Open-Source Software Developer Contest',
    },
    organization: {
      ko: '한국정보과학회 회장상 (President of KIISE)',
      en: 'President of KIISE',
    },
    project: 'Open-Set-Go',
    roleOrNote: {
      ko: '팀장 · Product Owner · 백엔드 리드 (공동 수상)',
      en: 'Team Leader, Product Owner & Backend Lead (Joint Award)',
    },
  },
  {
    date: '2022.12.15',
    title: {
      ko: '제20회 임베디드SW경진대회 일반부문 대상 (산업통상자원부 장관상)',
      en: 'Grand Prize (Minister of Trade, Industry and Energy Award), 20th Embedded Software Contest',
    },
    organization: {
      ko: '산업통상자원부 장관상',
      en: 'Ministry of Trade, Industry and Energy (MOTIE)',
    },
    project: 'Home++',
    roleOrNote: {
      ko: '팀장 · 서버 및 하드웨어 개발 (공동 수상)',
      en: 'Team Leader, Server & Hardware Prototyping (Joint Award)',
    },
  },
];

export const PROGRAMS_AND_ACTIVITIES: ProgramActivityItem[] = [
  {
    period: 'Summer 2026',
    title: {
      ko: 'UC Irvine GREAT (Global Research Experience in Artificial inTelligence) Program',
      en: 'UC Irvine GREAT (Global Research Experience in Artificial inTelligence) Program',
    },
    roleOrNote: {
      ko: '프로그램 수료 (2026.08.26) 및 GREAT Program Symposium 연구 발표 ("Accelerating Secure Deep Learning with FHE")',
      en: 'Completed (Aug 26, 2026) & Presented at GREAT Symposium ("Accelerating Secure Deep Learning with FHE")',
    },
    category: 'research-program',
    link: '/presentations/uci-great-2026-fhe-symposium.pdf',
  },
  {
    period: '2026.04 – 2026.06',
    title: {
      ko: '오픈소스 컨트리뷰션 아카데미 (체험형) · Git 활용 및 Valkey',
      en: 'Open-Source Contribution Academy (Experiential) · Git & Valkey',
    },
    roleOrNote: {
      ko: '수료 (인메모리 키-밸류 데이터스토어 Valkey 분석 및 오픈소스 워크플로우)',
      en: 'Completed (Valkey in-memory datastore & open-source contribution workflows)',
    },
    category: 'open-source',
  },
  {
    period: '2026.04.04',
    title: {
      ko: 'AI TOP 100 CAMPUS',
      en: 'AI TOP 100 CAMPUS',
    },
    roleOrNote: {
      ko: '본선 진출 100인 선정 (Top 100 Finalist Selection)',
      en: 'Selected among Top 100 Finalists',
    },
    category: 'selection',
  },
  {
    period: '2026.03 – Present',
    title: {
      ko: '국민대학교 SW중심대학 기자단 새움 (Saeum)',
      en: 'SW-Centered University Student Press Corps "Saeum"',
    },
    roleOrNote: {
      ko: '기자 (Reporter)',
      en: 'Student Reporter',
    },
    category: 'community',
  },
  {
    period: 'Current',
    title: {
      ko: '국민대학교 소프트웨어융합대학 동문회 웹사이트 (KMU-CS Alumni)',
      en: 'KMU-CS Alumni Official Website',
    },
    roleOrNote: {
      ko: '웹사이트 제작 및 유지보수 (Creator & Maintainer)',
      en: 'Website Creator & Maintainer',
    },
    category: 'community',
    link: 'https://alumni.cs.kookmin.ac.kr/',
  },
  {
    period: '2022.03 – 2023.12',
    title: {
      ko: '국민대학교 오픈소스 학술 동아리 KOSS (Kookmin Univ. Opensource Software Society)',
      en: 'KOSS (Kookmin Univ. Opensource Software Society)',
    },
    roleOrNote: {
      ko: '부원 → 운영부장 → 편집부장 역임 (학술 세미나·오픈소스 커뮤니티 운영 및 기술 아티클 편집)',
      en: 'Member → Head of Operations → Head of Editorial (Academic club operations & technical editorial)',
    },
    category: 'community',
  },
];

export const WORK_EXPERIENCE: WorkExperienceItem[] = [
  {
    company: {
      ko: '대한민국 해군본부 (Republic of Korea Navy, HQ)',
      en: 'Republic of Korea Navy, HQ (Gyeryong)',
    },
    role: {
      ko: 'SW개발병 (전문특기병 · Software Developer)',
      en: 'Software Developer (SW Development Specialist · Military Service)',
    },
    badgeLabel: {
      ko: 'Military SW Engineering',
      en: 'Military SW Engineering',
    },
    periods: [
      {
        ko: '2024.04.15 – 2025.12.14 (만기 전역 · 계룡대)',
        en: 'Apr 15, 2024 – Dec 14, 2025 (Gyeryong, Korea)',
      },
    ],
    techStack: ['Java', 'TypeScript', 'Spring Boot', 'React', 'Oracle DB', 'Intranet Architecture'],
    summary: {
      ko: '대한민국 해군본부 SW개발병(전문특기병)으로 복무하며 운영 중인 구체계의 구조적 한계를 분석·유지보수하고, 새로운 요구사항을 반영한 신체계를 설계·구현했습니다.',
      en: 'Served as a Software Development Specialist at ROK Navy Headquarters, analyzing structural limitations of legacy systems and designing/implementing next-generation intranet web systems end-to-end.',
    },
    bullets: {
      ko: [
        '국방망(인트라넷) 보안 제약 환경에서 시스템 아키텍처 설계, UI/UX, Oracle DB ERD 설계, Spring Boot 서버 및 React 프론트엔드 구현까지 전 과정 직접 수행',
        '단순 기능 보완에 그치지 않고 구체계의 데이터 흐름과 구조적 한계를 분석하여 실제 사용자의 업무 흐름에 맞는 신체계로 재설계',
        '복무 기간 중 KTCP 2024 제1저자 확장 학술지 논문 게재를 완료하고 리눅스마스터·네트워크관리사·정보처리산업기사·CSTS 등 자격증 6종 취득',
      ],
      en: [
        'Participated across the full lifecycle (system architecture, UI/UX, Oracle ERD modeling, and Spring Boot/React implementation) within air-gapped defense intranet environments.',
        'Analyzed structural bottlenecks in legacy military systems and re-architected new systems around reliable operational workflows.',
        'Completed publication of the extended first-author journal article (KTCP 2024) and earned 6 national IT/systems certifications during service.',
      ],
    },
  },
  {
    company: {
      ko: '콘캣 주식회사 (CONCAT Inc.)',
      en: 'CONCAT Inc.',
    },
    role: {
      ko: 'Backend Developer / Intern',
      en: 'Backend Developer / Intern',
    },
    badgeLabel: {
      ko: 'Industry Experience',
      en: 'Industry Experience',
    },
    periods: [
      {
        ko: '1차(대학 인턴십): 2023.06.22 – 2023.08.17',
        en: 'Period 1 (University Internship): Jun 2023 – Aug 2023',
      },
      {
        ko: '2차: 2023.11.21 – 2024.02.27',
        en: 'Period 2: Nov 2023 – Mar 2024',
      },
    ],
    techStack: ['Go', 'gRPC', 'Protocol Buffers', 'MongoDB Atlas', 'GCP Cloud Run', 'Cloud Build', 'Flutter'],
    summary: {
      ko: '서비스 초기 단계에서 기능 구현에 앞서 데이터 구조와 인터페이스 계약(Contract)을 설계하고, Go/gRPC 마이크로서비스 및 MongoDB 쿼리 최적화를 수행했습니다.',
      en: 'Led backend prototyping by establishing clear Protocol Buffers interface contracts between client and server, implementing Go/gRPC services, and optimizing MongoDB queries.',
    },
    bullets: {
      ko: [
        '계약(Contract) 중심 스키마 설계: Protocol Buffers 스키마를 정의하고 Go 서버와 Flutter 클라이언트가 안정적으로 공유하는 자동 생성 파이프라인을 구축하여 변경 영향 최소화',
        'ChatAde & HeartCrush 백엔드: 메시징·매칭·친구·로그인 API 및 gRPC 인터셉터 기반 인증/검증 구현 (GCP Cloud Run, Cloud Build, Cloud Storage 연동)',
        '쿼리 병목 튜닝: 약 50만 건 레코드 벤치마크 환경에서 MongoDB 쿼리 및 인덱스·스키마 최적화를 통해 특정 쿼리 응답 시간을 약 100ms에서 0–1ms 수준으로 단축',
      ],
      en: [
        'Contract-First Architecture: Defined shared Protocol Buffers schemas and automated code generation across Go servers and Flutter clients to minimize breaking changes.',
        'ChatAde & HeartCrush Backends: Built gRPC APIs and interceptor-based auth/validation on GCP (Cloud Run, Cloud Build, Cloud Storage).',
        'Query Optimization: Tuned MongoDB schema and queries, reducing specific query execution time from ~100 ms to 0–1 ms on a ~500,000-record benchmark dataset.',
      ],
    },
  },
];

export const CAREER_TIMELINE: TimelineMilestone[] = [
  {
    id: 'tl-kmu-msl',
    period: { ko: '2026.09 – 현재', en: 'Fall 2026 – Present' },
    category: 'research',
    categoryLabel: { ko: '연구실 (Research Lab)', en: 'Research Lab' },
    title: {
      ko: '국민대학교 Memory & Storage Laboratory (MSL) 학부연구생',
      en: 'Undergraduate Researcher @ Memory & Storage Lab (MSL)',
    },
    organization: {
      ko: '국민대학교 소프트웨어융합대학 (지도교수: 주용수)',
      en: 'Kookmin University',
    },
    description: {
      ko: '리눅스 커널 비동기 I/O (io_uring, DPAS) 심층 분석 및 NAND 플래시 스토리지 시스템의 읽기 단위 특성을 연구하고 있습니다.',
      en: 'Researching the Linux kernel asynchronous I/O stack (io_uring, DPAS) and NAND flash storage read granularity characteristics.',
    },
    tags: ['Linux Kernel I/O', 'io_uring', 'DPAS', 'NAND Flash'],
    highlightBadge: { ko: '현재 소속 연구실', en: 'Current Affiliation' },
  },
  {
    id: 'tl-uci-bias',
    period: { ko: '2026.05 – 현재', en: 'May 2026 – Present' },
    category: 'research',
    categoryLabel: { ko: '해외 방문 · 공동연구 (Research)', en: 'Visiting & Ongoing Research' },
    title: {
      ko: 'UC Irvine BIAS Lab 학부 방문연구 & 후속 연구 프로젝트 (GREAT Program)',
      en: 'Visiting & Collaborative Researcher @ UC Irvine BIAS Lab (GREAT Program)',
    },
    organization: {
      ko: 'University of California, Irvine (Prof. Mohsen Imani)',
      en: 'University of California, Irvine (UCI)',
    },
    description: {
      ko: '2026 UC Irvine GREAT 프로그램을 통해 방문연구를 시작하고 완전동형암호(FHE) 추론의 부트스트래핑 병목 완화 연구를 GREAT Program Symposium에서 발표했으며, 현재도 BIAS Lab과 후속 연구 프로젝트를 지속하고 있습니다.',
      en: 'Initiated undergraduate visiting research through the 2026 UCI GREAT Program, presented FHE deep learning acceleration research at the GREAT Program Symposium, and continuing follow-up research projects with BIAS Lab.',
    },
    tags: ['UC Irvine', 'BIAS Lab', 'FHE', 'Memory-Centric ML'],
    highlightBadge: { ko: '연구 지속 중 · GREAT Symposium', en: 'Ongoing · GREAT Symposium' },
  },
  {
    id: 'tl-osca-valkey',
    period: { ko: '2026.04 – 2026.06', en: 'Apr 2026 – Jun 2026' },
    category: 'engineering',
    categoryLabel: { ko: '오픈소스 프로그램', en: 'Open-Source Program' },
    title: {
      ko: '오픈소스 컨트리뷰션 아카데미 (체험형 · Git 활용 및 Valkey) 수료',
      en: 'Open-Source Contribution Academy (Experiential · Git & Valkey)',
    },
    organization: {
      ko: '과학기술정보통신부 · 정보통신산업진흥원(NIPA)',
      en: 'OSS Contribution Academy (NIPA)',
    },
    description: {
      ko: '인메모리 키-밸류 데이터스토어 Valkey 아키텍처 분석 및 Git 기반 오픈소스 컨트리뷰션 워크플로우 과정을 수료했습니다.',
      en: 'Completed experiential open-source contribution training focused on the Valkey in-memory datastore and Git workflows.',
    },
    tags: ['Valkey', 'Open Source', 'Git', 'In-Memory Datastore'],
  },
  {
    id: 'tl-ai-top-100',
    period: { ko: '2026.04.04', en: 'Apr 4, 2026' },
    category: 'honor',
    categoryLabel: { ko: '선발 (Selection)', en: 'Finalist Selection' },
    title: {
      ko: 'AI TOP 100 CAMPUS 본선 진출 100인 선정',
      en: 'Selected among Top 100 Finalists at AI TOP 100 CAMPUS',
    },
    organization: {
      ko: 'AI TOP 100 CAMPUS',
      en: 'AI TOP 100 CAMPUS',
    },
    description: {
      ko: '전국 대학(원)생 대상 AI 역량 경진대회인 AI TOP 100 CAMPUS에서 본선 진출 100인에 선정되었습니다.',
      en: 'Selected as one of the Top 100 Finalists in the AI TOP 100 CAMPUS competition.',
    },
    tags: ['AI TOP 100', 'Finalist Selection'],
  },
  {
    id: 'tl-ktcp-2024',
    period: { ko: '2024.10', en: 'Oct 2024' },
    category: 'publication',
    categoryLabel: { ko: '학술지 논문 출판 (Journal)', en: 'Journal Publication' },
    title: {
      ko: '정보과학회 컴퓨팅의 실제 논문지 (KTCP) 제1저자 논문 게재',
      en: 'First-Author Journal Article Published in KIISE Transactions on Computing Practices (KTCP)',
    },
    organization: {
      ko: '한국정보과학회 (Vol. 30, No. 10, pp. 499–505)',
      en: 'KIISE Transactions on Computing Practices (Vol. 30, No. 10)',
    },
    description: {
      ko: '「오픈소스 운영 진입장벽 완화를 위한 프로젝트 생성 및 운영 관리 서비스」 확장 논문을 제1저자로 KTCP 학술지에 게재했습니다 (DOI: 10.5626/KTCP.2024.30.10.499).',
      en: 'Published the extended journal version of Open-Set-Go as First Author in KIISE Transactions on Computing Practices.',
    },
    tags: ['First Author', 'KTCP 2024', 'Open-Set-Go', 'KCI Journal'],
    highlightBadge: { ko: '제1저자 학술지 게재', en: 'First-Author Journal' },
  },
  {
    id: 'tl-rok-navy',
    period: { ko: '2024.04.15 – 2025.12.14', en: 'Apr 15, 2024 – Dec 14, 2025' },
    category: 'engineering',
    categoryLabel: { ko: '군 복무 · 해군본부 SW개발병', en: 'ROK Navy HQ · SW Developer' },
    title: {
      ko: '대한민국 해군본부 SW개발병 (전문특기병) 복무',
      en: 'Software Developer (SW Development Specialist) @ Republic of Korea Navy, HQ',
    },
    organization: {
      ko: '대한민국 해군본부 (계룡대 · Gyeryong, Korea)',
      en: 'Republic of Korea Navy, HQ (Gyeryong)',
    },
    description: {
      ko: '국방망 인트라넷 보안 환경에서 운영 중인 구체계의 구조적 한계를 분석·유지보수하고, 새로운 요구사항을 반영한 신체계(Spring Boot, React, TypeScript, Oracle DB)의 아키텍처·ERD·UI/UX 설계 및 구현 전 과정에 참여했습니다.',
      en: 'Analyzed legacy systems and designed/implemented new intranet web systems (Spring Boot, React, TypeScript, Oracle DB) end-to-end at ROK Navy Headquarters.',
    },
    tags: ['Java', 'TypeScript', 'Spring Boot', 'React', 'Oracle DB'],
    highlightBadge: { ko: '해군본부 만기 전역', en: 'ROK Navy HQ' },
  },
  {
    id: 'tl-ksc-2023',
    period: { ko: '2023.12.21', en: 'Dec 21, 2023' },
    category: 'publication',
    categoryLabel: { ko: '학술대회 최우수논문상', en: 'Conference Best Paper' },
    title: {
      ko: 'KSC 2023 오픈소스소프트웨어 분야 최우수논문상 수상 (제1저자)',
      en: 'Best Paper Award in Open-Source SW Track at Korea Software Congress (KSC 2023)',
    },
    organization: {
      ko: '한국정보과학회 (KIISE)',
      en: 'Korean Institute of Information Scientists and Engineers (KIISE)',
    },
    description: {
      ko: '2023 한국소프트웨어종합학술대회(KSC 2023)에서 Open-Set-Go 연구 논문(pp. 425-427)을 제1저자로 Oral Session에서 발표했으며, 오픈소스소프트웨어 분야 최우수논문상(한국정보과학회 회장상)을 수상했습니다.',
      en: 'Presented Open-Set-Go as First Author in an oral session at KSC 2023 and received the Best Paper Award (President of KIISE Award).',
    },
    tags: ['First Author', 'KSC 2023', 'Best Paper Award', 'Open-Set-Go'],
    highlightBadge: { ko: 'KSC 2023 최우수논문상', en: 'Best Paper Award' },
  },
  {
    id: 'tl-oss-contest-2023',
    period: { ko: '2023.12.01', en: 'Dec 1, 2023' },
    category: 'honor',
    categoryLabel: { ko: 'SW 경진대회 수상', en: 'Software Contest Award' },
    title: {
      ko: '2023년 공개SW 개발자대회 학생부문 은상 (Open-Set-Go)',
      en: 'Silver Prize (Student Division) at 2023 Open-Source SW Developer Contest',
    },
    organization: {
      ko: '한국정보과학회 회장상 · 팀 또이오티 (팀장 / PO / 백엔드 리드)',
      en: 'President of KIISE Award · Team Leader & Backend Lead',
    },
    description: {
      ko: '오픈소스 프로젝트 생성 및 운영 관리 플랫폼 Open-Set-Go의 팀장·Product Owner·백엔드 리드를 맡아 2023년 공개SW 개발자대회 학생부문 은상을 수상했습니다.',
      en: 'Led Team Ttoi-Oti as Team Leader, Product Owner, and Backend Lead on Open-Set-Go, winning Silver Prize.',
    },
    tags: ['Open-Set-Go', 'Team Leader', 'GitHub API', 'OSS Governance'],
    highlightBadge: { ko: '정보과학회장상 (은상)', en: 'Silver Prize' },
  },
  {
    id: 'tl-concat-inc',
    period: { ko: '2023.06 – 2023.08, 2023.11 – 2024.02', en: 'Jun – Aug 2023, Nov 2023 – Feb 2024' },
    category: 'engineering',
    categoryLabel: { ko: '산업체 실무 경력 (Industry)', en: 'Industry Experience' },
    title: {
      ko: '콘캣 주식회사 (CONCAT Inc.) Backend Developer / Intern',
      en: 'Backend Developer / Intern @ CONCAT Inc.',
    },
    organization: {
      ko: '콘캣 주식회사 (CONCAT Inc.)',
      en: 'CONCAT Inc.',
    },
    description: {
      ko: 'Protocol Buffers 기반 인터페이스 계약(Contract)을 설계해 Go 서버와 Flutter 클라이언트 간 코드 생성 파이프라인을 구축하고, gRPC 마이크로서비스 개발 및 50만 건 규모 MongoDB 쿼리 튜닝(100ms → 0–1ms)을 수행했습니다.',
      en: 'Designed contract-first Protocol Buffers schemas, built Go/gRPC microservices on GCP, and tuned MongoDB queries from ~100 ms to 0–1 ms.',
    },
    tags: ['Go', 'gRPC', 'Protocol Buffers', 'MongoDB', 'GCP'],
  },
  {
    id: 'tl-home-plus-plus',
    period: { ko: '2022.05 – 2022.12', en: 'May 2022 – Dec 2022' },
    category: 'honor',
    categoryLabel: { ko: '장관상 대상 수상', en: 'Minister Grand Prize' },
    title: {
      ko: '제20회 임베디드SW경진대회 일반부문 대상 (Home++)',
      en: 'Home++ (webOS OSE Platform) · Grand Prize at 20th Embedded SW Contest',
    },
    organization: {
      ko: '산업통상자원부 장관상 · 팀장 및 서버/하드웨어 개발',
      en: 'Ministry of Trade, Industry and Energy (MOTIE)',
    },
    description: {
      ko: '설치형 IoT 앱 생태계를 지원하는 webOS OSE 기반 스마트 월패드 플랫폼 Home++의 팀장 및 서버·하드웨어 개발을 맡아 제20회 임베디드SW경진대회 일반부문 대상(산업통상자원부 장관상)을 수상했습니다.',
      en: 'Led server deployment and hardware prototyping for Home++, winning the Grand Prize (Minister of Trade, Industry and Energy Award) at the 20th Embedded Software Contest.',
    },
    tags: ['webOS OSE', 'Embedded Systems', 'IoT', 'Team Leader'],
    highlightBadge: { ko: '산업통상자원부 장관상(대상)', en: 'MOTIE Minister Grand Prize' },
  },
  {
    id: 'tl-koss',
    period: { ko: '2022.03 – 2023.12', en: 'Mar 2022 – Dec 2023' },
    category: 'engineering',
    categoryLabel: { ko: '오픈소스 학술 동아리 (Academic Club)', en: 'Open-Source Academic Society' },
    title: {
      ko: '국민대학교 오픈소스 학술 동아리 KOSS (부원 → 운영부장 → 편집부장)',
      en: 'KOSS · Kookmin Univ. Opensource Software Society (Member → Head of Ops → Head of Editorial)',
    },
    organization: {
      ko: '국민대학교 소프트웨어융합대학 (KOSS)',
      en: 'Kookmin University (KOSS)',
    },
    description: {
      ko: '국민대학교 오픈소스 소프트웨어 학술 동아리 KOSS에서 부원으로 시작해 운영부장 및 편집부장을 역임했습니다.',
      en: 'Served as Member, Head of Operations, and Head of Editorial at KOSS (Kookmin Univ. Opensource Software Society).',
    },
    tags: ['KOSS', 'Open Source', 'Head of Operations', 'Head of Editorial'],
    highlightBadge: { ko: '운영부장 · 편집부장 역임', en: 'Ops & Editorial Lead' },
  },
];

export const PAPER_READING_LIST: PaperReadingItem[] = [
  {
    id: 'paper-reading-nvmevirt',
    status: 'reading',
    statusLabel: { ko: '읽는 중', en: 'Reading Now' },
    category: 'Storage & Kernel I/O',
    title: 'NVMeVirt: A Versatile Software-defined Virtual NVMe Device',
    authorsOrGroup: 'Sang-Hoon Kim, Jaehoon Shim, Euidong Lee, Seongyeop Jeong, Ilkyeun Ra, Jin-Soo Kim',
    venue: 'USENIX FAST 2023',
    year: '2023',
    takeaway: {
      ko: '커널 레벨에서 실제 PCIe/NVMe 장치처럼 동작하는 소프트웨어 정의 가상 NVMe 디바이스(NVMeVirt) 아키텍처와, Conventional SSD·ZNS·KV-SSD 내부 채널/칩 타이밍 모델링 및 호스트 I/O 에뮬레이션 구조를 분석 중입니다.',
      en: 'Analyzing the software-defined virtual NVMe device architecture (NVMeVirt) that emulates real PCIe/NVMe devices at the kernel level across Conventional, ZNS, and KV-SSD targets.',
    },
    tags: ['NVMeVirt', 'Virtual NVMe', 'USENIX FAST'],
    paperUrl: 'https://www.usenix.org/conference/fast23/presentation/kim',
  },
  {
    id: 'paper-reading-soml-read',
    status: 'reading',
    statusLabel: { ko: '읽는 중', en: 'Reading Now' },
    category: 'Storage & Kernel I/O',
    title: 'SOML Read: Rethinking the Read Operation Granularity of 3D NAND SSDs',
    authorsOrGroup: 'Chun-Yi Liu, Jagadish B. Kotra, Myoungsoo Jung, Mahmut Kandemir',
    venue: 'ACM ASPLOS 2019',
    year: '2019',
    takeaway: {
      ko: '고밀도 3D NAND SSD에서 칩 수 감소로 인해 저하되는 칩 간 병렬성을 보완하기 위해, 단일 칩 내부의 서로 다른 위치를 동시에 읽는 SOML(Single-Operation-Multiple-Location) Read 메커니즘과 읽기 단위(Read Granularity) 재설계 아이디어를 분석 중입니다.',
      en: 'Studying the Single-Operation-Multiple-Location (SOML) Read mechanism and read granularity redesign to boost intra-chip parallelism in high-density 3D NAND SSDs.',
    },
    tags: ['SOML Read', '3D NAND SSD', 'Read Granularity'],
    paperUrl: 'https://doi.org/10.1145/3297858.3304035',
    relatedPostSlug: '2026-11-01-nand-read-granularity-archive-notes',
  },
  {
    id: 'paper-reading-hdc-reliable',
    status: 'reading',
    statusLabel: { ko: '읽는 중', en: 'Reading Now' },
    category: 'Computer Architecture & FHE',
    title: 'Reliable Hyperdimensional Reasoning on Unreliable Emerging Technologies',
    authorsOrGroup: 'Hamza Errahmouni Barkam, Sanggeon Yun, Hanning Chen et al. (Mohsen Imani)',
    venue: 'IEEE/ACM ICCAD 2023',
    year: '2023',
    takeaway: {
      ko: '차세대 비휘발성 메모리(NVM) 기반 Compute-in-Memory(CiM) 소자의 물리적 노이즈와 소자 변이 환경에서도 안정적인 추론을 달성하기 위한 초차원 컴퓨팅(Hyperdimensional Computing, HDC) 알고리즘·하드웨어 공동 최적화 구조를 읽고 있습니다.',
      en: 'Analyzing algorithm-hardware co-optimization for brain-inspired Hyperdimensional Computing (HDC) to achieve reliable reasoning on noisy emerging Compute-in-Memory (CiM) substrates.',
    },
    tags: ['HDC', 'Compute-in-Memory', 'ICCAD'],
    paperUrl: 'https://doi.org/10.1109/ICCAD57390.2023.10323626',
  },
  {
    id: 'paper-read-dpas',
    status: 'completed',
    statusLabel: { ko: '완독 · 스터디 완료', en: 'Completed' },
    category: 'Storage & Kernel I/O',
    title: 'Dynamic Polling and Interrupt-Based I/O Completion (DPAS) in High-Speed Storage Systems',
    authorsOrGroup: 'Memory & Storage Laboratory (Kookmin University)',
    venue: 'MSL Lab Core Research Literature',
    year: 'Studied 2026',
    takeaway: {
      ko: 'I/O 부하와 지연 특성에 따라 폴링(Polling)과 인터럽트 기반 완료 경로를 동적으로 전환하여 CPU 소모율과 응답 지연 사이의 최적 균형을 찾는 기법을 학습했습니다.',
      en: 'Studied how dynamically switching between polling and interrupt-based I/O completion balances CPU utilization and tail latency under varying storage workloads.',
    },
    tags: ['DPAS', 'I/O Completion', 'Hybrid Polling'],
    relatedPostSlug: '2026-10-18-io-uring-submission-completion-architecture',
  },
  {
    id: 'paper-read-cheddar',
    status: 'completed',
    statusLabel: { ko: '완독 · 노트 정리', en: 'Completed' },
    category: 'Computer Architecture & FHE',
    title: 'Cheddar: A Swift Fully Homomorphic Encryption Library for CUDA GPUs',
    authorsOrGroup: 'Kim et al.',
    venue: 'arXiv:2407.13055 (GPU Architecture & Cryptography)',
    year: '2024',
    takeaway: {
      ko: 'CKKS 동형암호 연산에서 가장 큰 병목인 NTT/INTT 변환과 대규모 다항식 메모리 대역폭 문제를 CUDA 커널 퓨전과 온칩 메모리 계층 최적화로 해결한 방식을 분석했습니다.',
      en: 'Analyzed how CUDA kernel fusion and on-chip memory hierarchy optimizations overcome NTT/INTT and polynomial memory-bandwidth bottlenecks in CKKS FHE.',
    },
    tags: ['FHE', 'CUDA GPU', 'NTT Optimization'],
    paperUrl: 'https://arxiv.org/abs/2407.13055',
    relatedPostSlug: '2026-08-28-fhe-encrypted-inference-study-notes',
  },
  {
    id: 'paper-read-encryptedllm',
    status: 'completed',
    statusLabel: { ko: '완독 · 노트 정리', en: 'Completed' },
    category: 'Computer Architecture & FHE',
    title: 'EncryptedLLM: GPU-Accelerated FHE for Privacy-Preserving LLM Inference',
    authorsOrGroup: 'de Castro et al.',
    venue: 'ICML / PMLR v267',
    year: '2025',
    takeaway: {
      ko: '트랜스포머 추론 시 비선형 활성화 함수의 다항식 근사 차수 증가가 노이즈 예산 소모 및 부트스트래핑(Bootstrapping) 빈도로 직결되는 시스템적 트레이드오프를 정리했습니다.',
      en: 'Examined the system-level trade-offs among polynomial approximation degree of non-linear activations, multiplicative depth consumption, and bootstrapping frequency in encrypted LLM inference.',
    },
    tags: ['EncryptedLLM', 'FHE Inference', 'Bootstrapping'],
    paperUrl: 'https://proceedings.mlr.press/v267/de-castro25a.html',
    relatedPostSlug: '2026-08-28-fhe-encrypted-inference-study-notes',
  },
  {
    id: 'paper-read-product-keys',
    status: 'completed',
    statusLabel: { ko: '완독 · 노트 정리', en: 'Completed' },
    category: 'Computer Architecture & FHE',
    title: 'Large Memory Layers with Product Keys',
    authorsOrGroup: 'Guillaume Lample et al. (FAIR)',
    venue: 'NeurIPS 2019 (arXiv:1907.05242)',
    year: '2019',
    takeaway: {
      ko: '대규모 키 공간을 두 개의 서브 키 곱집합(Product Keys)으로 분해하여 탐색 복잡도를 O(N)에서 O(sqrt(N))으로 낮추고, 연산량(FLOPs) 증가 없이 모델 용량을 확장하는 메모리 중심 구조를 학습했습니다.',
      en: 'Studied how decomposing a large key space into Cartesian product keys reduces lookup complexity from O(N) to O(sqrt(N)), scaling model capacity without increasing FLOPs.',
    },
    tags: ['Product Keys', 'Memory Layers', 'NeurIPS'],
    paperUrl: 'https://arxiv.org/abs/1907.05242',
    relatedPostSlug: '2026-08-28-fhe-encrypted-inference-study-notes',
  },
];

export const SOFTWARE_PROJECTS: ProjectItem[] = [
  {
    id: 'auth-fetch-mcp',
    name: 'auth-fetch-mcp',
    subtitle: {
      ko: '로그인 보호 웹페이지 접근을 위한 로컬 브라우저 기반 MCP 서버',
      en: 'Local Browser-Authenticated Web Page Fetch MCP Server for AI Clients',
    },
    period: '2025 – 2026',
    role: {
      ko: '1인 개발 · 오픈소스 메인테이너',
      en: 'Individual Developer & Maintainer',
    },
    repoUrl: 'https://github.com/ymw0407/auth-fetch-mcp',
    techStack: ['TypeScript', 'Playwright', 'MCP', 'Node.js'],
    description: {
      ko: '사용자가 로컬 브라우저에서 직접 로그인하고 명시적으로 캡처한 인증 세션을 바탕으로, AI 클라이언트가 로그인 보호 웹페이지의 콘텐츠를 안전하게 가져올 수 있도록 지원하는 오픈소스 MCP 서버입니다.',
      en: 'An open-source MCP server enabling AI clients to access login-protected web pages after the user explicitly signs in and captures the session in a local browser.',
    },
    highlights: {
      ko: [
        'Playwright 기반 로컬 인증 세션 캡처 및 Model Context Protocol 표준 도구 인터페이스 설계',
        '외부 보안 리포트 대응 및 세션 격리·검증 로직 유지보수',
      ],
      en: [
        'Designed the MCP tool interface and Playwright-driven explicit session capture workflow.',
        'Maintained open-source releases and responded to external security reports.',
      ],
    },
  },
  {
    id: 'open-set-go',
    name: 'Open-Set-Go',
    subtitle: {
      ko: '오픈소스 운영 진입장벽 완화를 위한 프로젝트 생성 및 운영 관리 플랫폼',
      en: 'Platform for Open-Source Project Generation, Operational Review & Contribution Guidance',
    },
    period: '2023.06 – 2023.12',
    role: {
      ko: '팀장 · Product Owner · 백엔드 리드',
      en: 'Team Leader, Product Owner & Backend Lead',
    },
    repoUrl: 'https://github.com/AgainIoT/Open-Set-Go',
    isArchivedRepo: true,
    techStack: ['GitHub API', 'OAuth', 'CI/CD', 'OSS Governance'],
    description: {
      ko: '오픈소스 프로젝트를 시작하고 운영하는 과정에서 겪는 문서화·규칙 설정·기여 가이드 부재 문제를 해결하기 위해 GitHub 연동 리소스 생성 및 운영 진단 기능을 제공하는 플랫폼입니다.',
      en: 'A GitHub-integrated service that lowers barriers to open-source maintenance by automating project resource generation, reviewing repository operations, and guiding contributors.',
    },
    highlights: {
      ko: [
        'GitHub OAuth, 저장소 및 Pull Request 연동, 템플릿 자동 생성 및 운영 관리 아키텍처 리드',
        'KSC 2023 오픈소스SW 분야 최우수논문상 수상 및 KTCP 2024 확장 학술지 논문 제1저자 출판',
        '2023 공개SW 개발자대회 학생부문 은상 수상',
      ],
      en: [
        'Led product direction and backend integration with GitHub OAuth, repositories, and PR workflows.',
        'Published as First Author in KSC 2023 (Best Paper Award) and extended in KTCP 2024.',
        'Won Silver Prize at the 2023 Open-Source Software Developer Contest.',
      ],
    },
    relatedBadge: {
      ko: 'KSC 2023 최우수논문상 · KTCP 2024 제1저자 · 공개SW 은상',
      en: 'KSC 2023 Best Paper · KTCP 2024 Journal · OSS Silver Prize',
    },
  },
  {
    id: 'open-raw',
    name: 'OpenRaw',
    subtitle: {
      ko: '사진가를 위한 성장 플랫폼 (EXIF 회고 · RAW 보정 챌린지 · 워크플로우 자동화)',
      en: 'Growth Platform for Photographers (EXIF Retrospectives, RAW Challenges & Workflow Automation)',
    },
    period: '2026',
    role: {
      ko: '팀장 · 총괄 아키텍트 · 풀스택/인프라 전담',
      en: 'Project Lead, Chief Architect & Core Dev',
    },
    presentationPdfUrl: '/presentations/open-raw-platform-deck.pdf',
    presentationTitle: {
      ko: 'OpenRaw 서비스 기획 및 아키텍처 발표 자료 (45p PDF)',
      en: 'OpenRaw Service & System Architecture Presentation Deck (45p PDF)',
    },
    techStack: ['Spring Boot', 'Go · gRPC', 'React · TS', 'PostgreSQL', 'OCI ARM64'],
    description: {
      ko: '사진 취미의 성장 정체와 분절된 후보정·공유 과정을 해결하기 위해, 촬영·EXIF 회고·주제 및 RAW 보정 챌린지·SNS 내보내기를 하나의 성장 루프로 연결한 플랫폼입니다 ("사진가를 위한 solved.ac이자 Strava"). 서비스 기획부터 폴리글랏 MSA, 보안 파이프라인, 인프라 및 AI 협업 가드레일까지 전 과정을 직접 설계·구현했습니다.',
      en: 'A photography growth platform ("solved.ac and Strava for photographers") uniting EXIF retrospectives, RAW editing challenges, and export automation into a single growth loop. Solely architected and implemented the product design, polyglot MSA backend, image security pipeline, cloud infrastructure, and AI-guardrailed team workflow.',
    },
    highlights: {
      ko: [
        '도메인 모델링 & 코어 기능 전담 구현: 디지털(EXIF 자동 파싱·서드파티 렌즈/기종 표준화)과 필름(수동 입력)을 통합한 단일 Shot 데이터 모델, 원본 구도를 보존하는 Justified Rows 갤러리, 촬영 통계 공유 카드, 주제·RAW 보정 챌린지 및 EXIF 프레임·레터박스·3분할 크롭 내보내기 구현',
        '폴리글랏 MSA & 인프라 비용 엔지니어링 (월 $130~180 → $0.13): Spring Boot(auth·photo·stats REST) + Go(image gRPC) + PostgreSQL 16(Schema-per-service, Flyway, AFTER_COMMIT 이벤트) 구조를 표준 인터페이스로 분리 설계하여, 상시 고정비가 큰 AWS 대신 OCI Ampere A1(ARM64) Always Free + Caddy + Netlify 환경으로 코드 변경 없이 이식해 월 고정비를 1,000배 이상 절감',
        '제로트러스트 이미지 재구성 보안 파이프라인 (Go image-service): 원본 바이트 불신 원칙 하에 Presigned URL 제약 → jpeg.DecodeConfig 헤더 픽셀 예산 검사(디컴프레션 폭탄 차단) → 순수 픽셀 디코딩 및 RGBA 정규화 → EXIF Orientation 실제 픽셀 반영 → 새 PNG 재인코딩 후 원본 폐기 파이프라인을 구축해 Polyglot·스테가노그래피·악성 메타데이터 및 GPS 노출 원천 차단 (필요 EXIF만 파싱 후 DB 구조화)',
        'Stateless RS256(RSA 비대칭키) JWT 인가 구조: auth-service는 RSA 개인키로 토큰을 서명(access 1h + refresh 14d httpOnly 쿠키)하고, photo·stats 도메인 서비스는 RSA 공개키로 서명·만료·권한을 자체 검증하여 MSA 서비스 간 인증 호출 병목 및 결합도 제거',
        '비개발자 팀원을 위한 AI 협업 가드레일 & Skill 파이프라인 설계: 비숙련 팀원도 AI 도구로 안전하게 기여할 수 있도록 AGENTS.md/CLAUDE.md 단일 규칙 체계, 이슈·PR 템플릿, 셀프 머지 차단·CI(lint/test/build)·관리자 리뷰 게이트를 구축하고 반복 작업(add-api-endpoint, add-proto-rpc, add-migration 등)을 AI Skill로 자동화하여 전체 산출물 품질 통제',
      ],
      en: [
        'Domain Modeling & End-to-End Core Implementation: Built the unified Digital+Film Shot data model (with lens/body EXIF normalization), aspect-ratio-preserving Justified Rows gallery, shareable shooting insight cards, RAW editing challenges, and automated EXIF frame/letterbox/3-split export tools.',
        'Polyglot MSA & Cloud Cost Engineering ($130–180/mo → $0.13/mo): Architected decoupled Spring Boot (auth/photo/stats REST), Go (image gRPC), and PostgreSQL 16 (schema-per-service, Flyway, AFTER_COMMIT events) services, migrating seamlessly from AWS to OCI Ampere A1 (ARM64) Always Free + Caddy + Netlify to cut idle monthly cost by >1,000x.',
        'Zero-Trust Image Reconstruction Security Pipeline (Go): Enforced untrusted-input defense via header pixel-budget validation (blocking decompression bombs), raw pixel decoding, EXIF orientation baking, and clean PNG re-encoding (discarding original bytes) to neutralize polyglot, steganography, trailing-byte, and GPS leak threats while structuring EXIF into DB.',
        'Stateless RS256 Asymmetric JWT Authorization: Implemented RSA private-key signing in auth-service (1h access + 14d httpOnly refresh cookie) and local RSA public-key verification across domain services to eliminate inter-service auth bottlenecks.',
        'AI-Guardrailed Team Workflow & Skill Automation: Designed strict CI/CD and repository guardrails (unified AGENTS.md/CLAUDE.md rules, branch/PR gates, and reusable AI Skills like add-api-endpoint, add-proto-rpc, add-migration) enabling non-expert teammates to contribute safely under architect review.',
      ],
    },
  },
  {
    id: 'home-plus-plus',
    name: 'Home++',
    subtitle: {
      ko: '설치형 앱 생태계 기반 webOS OSE 스마트 월패드 플랫폼',
      en: 'webOS OSE Smart Wall-Pad Platform Built Around Installable Home IoT Applications',
    },
    period: '2022.05 – 2022.12',
    role: {
      ko: '팀장 · 서버 및 하드웨어 개발',
      en: 'Team Leader, Server & Hardware Dev',
    },
    repoUrl: 'https://github.com/ymw0407/2022ESWContest_webOS_3013',
    techStack: ['webOS OSE', 'Node.js', 'MQTT', 'Embedded IoT'],
    description: {
      ko: '폐쇄적인 기존 아파트 월패드 구조를 개선하여 사용자가 가전 제어, CCTV, 홈 트레이닝, 택배 모니터링, 차량 배차 등의 애플리케이션을 설치해 확장할 수 있는 webOS OSE 기반 스마트 월패드 플랫폼입니다.',
      en: 'A webOS OSE wall-pad platform designed around installable applications including appliance control, CCTV, home exercise, delivery monitoring, and vehicle scheduling.',
    },
    highlights: {
      ko: [
        '디바이스-서버 간 통신 설계, 서버 배포 및 하드웨어 프로토타이핑 직접 수행',
        '제20회 임베디드SW경진대회 일반부문 대상(산업통상자원부 장관상) 수상',
      ],
      en: [
        'Engineered device-to-server communication, server deployment, and hardware prototyping.',
        'Awarded Grand Prize (Minister of Trade, Industry and Energy Award) at the 20th Embedded SW Contest.',
      ],
    },
    relatedBadge: {
      ko: '2022 임베디드SW경진대회 대상 (장관상)',
      en: 'Grand Prize (Minister Award), 2022 Embedded SW Contest',
    },
  },
  {
    id: 'everyones-transfer',
    name: "Everyone's Transfer (모두의 환승)",
    subtitle: {
      ko: '교통약자 지하철 환승 지도 제작 연구자를 위한 구조화 데이터 수집 앱 및 API',
      en: 'Structured Data Collection App & API for Accessible Subway Transfer Map Researchers',
    },
    period: '2023.02 – 2023.06',
    role: {
      ko: '팀장 · 백엔드 개발',
      en: 'Team Leader & Backend Developer',
    },
    repoUrl: 'https://github.com/AgainIoT/Everyones-Transfer_Main',
    isArchivedRepo: true,
    techStack: ['Express.js', 'Node.js', 'MongoDB', 'REST API'],
    description: {
      ko: '교통약자를 위한 지하철 환승 지도를 제작하는 연구자들이 현장 조사 데이터를 체계적으로 수집·관리할 수 있도록 설계된 애플리케이션 및 백엔드 API입니다.',
      en: 'A structured field-data collection application and backend API built for researchers preparing accessible subway transfer maps.',
    },
    highlights: {
      ko: [
        'Express.js 및 MongoDB 기반 데이터 스키마 설계, REST API 구현 및 기술 문서화 주도',
      ],
      en: [
        'Led backend development with Express.js and MongoDB, designing data schemas, REST APIs, and documentation.',
      ],
    },
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: {
      ko: 'AWS Certified Cloud Practitioner (CLF-C02)',
      en: 'AWS Certified Cloud Practitioner (CLF-C02)',
    },
    date: '2026.05',
    issuer: { ko: 'Amazon Web Services', en: 'Amazon Web Services' },
    category: 'cloud-sys',
  },
  {
    name: {
      ko: '네트워크관리사 2급 (Network Advisor Grade 2)',
      en: 'Network Advisor Grade 2 (네트워크관리사 2급)',
    },
    date: '2025.09',
    issuer: { ko: '한국정보통신자격협회 (ICQA)', en: 'ICQA' },
    category: 'cloud-sys',
  },
  {
    name: {
      ko: '리눅스마스터 2급 (Linux Master Grade 2)',
      en: 'Linux Master Grade 2 (리눅스마스터 2급)',
    },
    date: '2025.03',
    issuer: { ko: '한국정보통신진흥협회 (KAIT)', en: 'KAIT' },
    category: 'cloud-sys',
  },
  {
    name: {
      ko: '정보처리산업기사 (Industrial Engineer Information Processing)',
      en: 'Industrial Engineer Information Processing (정보처리산업기사)',
    },
    date: '2025.06',
    issuer: { ko: '한국산업인력공단 (HRDK)', en: 'HRD Korea' },
    category: 'sw-data',
  },
  {
    name: {
      ko: 'SW테스트전문가 (CSTS) 일반등급',
      en: 'Certified Software Testing Specialist (CSTS Foundation)',
    },
    date: '2025.02',
    issuer: { ko: '한국정보통신기술협회 (TTA)', en: 'Telecommunications Technology Association (TTA)' },
    category: 'sw-data',
  },
  {
    name: {
      ko: 'SQL 개발자 (SQLD)',
      en: 'SQL Developer (SQLD)',
    },
    date: '2024.04',
    issuer: { ko: '한국데이터산업진흥원 (K-Data)', en: 'Korea Data Agency' },
    category: 'sw-data',
  },
  {
    name: {
      ko: '웹디자인개발기능사 (Craftsman Web Design & Development)',
      en: 'Craftsman Web Design & Development (웹디자인개발기능사)',
    },
    date: '2025.09',
    issuer: { ko: '한국산업인력공단 (HRDK)', en: 'HRD Korea' },
    category: 'sw-data',
  },
];

export const PHOTO_ARCHIVE: PhotoArchiveItem[] = [
  {
    id: 'aurora-curtain-2026',
    titleKo: '숲 위의 오로라 커튼',
    titleEn: 'Aurora Curtain Above the Forest',
    award: {
      ko: '2026년 기상사진 공모전 장려상',
      en: 'Encouragement Prize, 2026 Weather Photography Contest',
    },
    issuer: {
      ko: '공군작전사령관상',
      en: 'Republic of Korea Air Force Operations Command',
    },
    date: '2026.09.01',
    imagePath: '/photography/2026-weather-aurora-curtain.jpg',
  },
  {
    id: 'sea-of-clouds-2025',
    titleKo: '하늘과 바다가 만나는 운해',
    titleEn: 'Sea of Clouds Where Sky Meets Ocean',
    award: {
      ko: '2025년 기상사진 공모전 장려상',
      en: 'Encouragement Prize, 2025 Weather Photography Contest',
    },
    issuer: {
      ko: '공군작전사령관상',
      en: 'Republic of Korea Air Force Operations Command',
    },
    date: '2025.09.09',
    imagePath: '/photography/2025-weather-sea-of-clouds.jpg',
  },
  {
    id: 'navy-dokdo-2025',
    titleKo: '해양수호의 염원, 독도에 새기다',
    titleEn: 'Aspiration for Maritime Defense, Engraved on Dokdo',
    award: {
      ko: '해군창설 80주년 기념 해군사진 및 디자인 공모전 사진부문 동상',
      en: 'Bronze Prize (Photography), ROK Navy 80th Anniversary Photo & Design Contest',
    },
    issuer: {
      ko: '해군참모총장상',
      en: 'Chief of Naval Operations, ROK Navy',
    },
    date: '2025.07.17',
    imagePath: '/photography/2025-navy-dokdo.jpg',
  },
  {
    id: 'spring-cherry-blossoms-2025',
    titleKo: '벚꽃피듯 피어난 우리들의 웃음꽃',
    titleEn: 'Our Laughter Blossoming Like Cherry Blossoms',
    award: {
      ko: '2025년 봄과 함께 春을… 사진공모전 우수상',
      en: 'Excellence Prize, 2025 Spring Photography Contest',
    },
    issuer: {
      ko: '계룡대근무지원단장상',
      en: 'Gyeryongdae Service Support Group',
    },
    date: '2025.04.24',
    imagePath: '/photography/2025-spring-cherry-blossoms.jpg',
  },
  {
    id: 'autumn-youth-2024',
    titleKo: '가을 하늘에 날리는 청춘의 꿈',
    titleEn: 'Dreams of Youth Soaring in the Autumn Sky',
    award: {
      ko: '2024년 반갑다 가을아! 사진공모전 최우수상',
      en: 'Grand Prize, 2024 Autumn Photography Contest',
    },
    issuer: {
      ko: '계룡대근무지원단장상',
      en: 'Gyeryongdae Service Support Group',
    },
    date: '2024.11.29',
    imagePath: '/photography/2024-autumn-youth.jpg',
  },
];

export const ESSAY_PUBLICATIONS = [
  {
    titleKo: '나의 군 생활 핵심은 인간관계와 낭만',
    titleEn: 'The Core of My Military Service: Human Relationships and Romance',
    venue: {
      ko: '월간 「해군」 (Republic of Korea Navy Magazine), 제578호, pp. 36–37',
      en: 'Republic of Korea Navy Magazine, Vol. 578, pp. 36–37',
    },
    date: 'November 2025',
    author: '윤민우 (Minwoo Yun)',
    note: {
      ko: '개인 수필 기고 (비학술 출판물 · 학술 논문 목록과 분리 관리)',
      en: 'Personal essay contribution (non-academic publication, archived separately from academic papers)',
    },
    externalUrl: 'https://www.navy.mil.kr/news/webzine/ibook_2511/pdf/36.pdf',
  },
];

export const OTHER_ARCHIVE_ACTIVITIES = [
  {
    period: '2025.07.07 – 2025.11.28',
    title: {
      ko: '제12기 해군 인권 모니터단 (12th ROK Navy Human Rights Monitor Group)',
      en: '12th ROK Navy Human Rights Monitor Group',
    },
    note: {
      ko: '임명 및 복무 중 활동 기록',
      en: 'Appointed monitor member during naval service',
    },
  },
];
