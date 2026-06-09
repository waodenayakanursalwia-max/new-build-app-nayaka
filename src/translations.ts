export interface AppTranslation {
  appName: string;
  subTitle: string;
  tagline: string;
  heroHeader: string;
  heroDecoration: string;
  heroSub: string;
  backHome: string;
  
  // Tabs
  tabInterpreter: string;
  tabHistory: string;
  tabMilestones: string;
  tabActivities: string;
  tabChecklist: string;

  // Inspiration Presets
  presetHeading: string;
  presetSub: string;
  presetBabble: string;
  presetDrawing: string;
  presetBehavior: string;

  // Scenarios
  scenarios: {
    towerCrasherTitle: string;
    towerCrasherDesc: string;
    towerCrasherPlaceholder: string;
    dragonScribbleTitle: string;
    dragonScribbleDesc: string;
    dragonScribblePlaceholder: string;
    bahExplorerTitle: string;
    bahExplorerDesc: string;
    bahExplorerPlaceholder: string;
  };

  // Form elements
  formTitle: string;
  formReset: string;
  formAgeLabel: string;
  formTypeLabel: string;
  formPromptLabel: string;
  formPromptPlaceholderBabble: string;
  formPromptPlaceholderDrawing: string;
  formPromptPlaceholderBehavior: string;
  formPromptSubText: string;
  formCharCount: string;
  formPhotoLabel: string;
  formPhotoRequired: string;
  formPhotoSub: string;
  formBrowse: string;
  formWebcam: string;
  formCapture: string;
  formCancel: string;
  formRemoveImage: string;
  formSubmitBtn: string;
  formSubmitLoading: string;

  // Results Section
  resultsTitle: string;
  resultsSubtitle: string;
  resultsPlaceholder: string;
  resultsWaiting: string;
  resultsAnalyzingText: string;
  resultsMagicBehindIt: string;
  resultsHiddenMilestone: string;
  resultsPlayfulActionPlan: string;
  resultsEncouragement: string;
  resultsWarningTitle: string;
  resultsWarningText: string;
  resultsPsychologistTag: string;
  resultsCommitmentTitle: string;
  resultsCommitmentText: string;

  // History Section
  historyTitle: string;
  historySubtitle: string;
  historyClearAll: string;
  historyClearConfirm: string;
  historyNoItemTitle: string;
  historyNoItemDesc: string;
  historyBtnBack: string;
  historyItemContext: string;
  historyItemMilestone: string;
  historyItemReading: string;
  historyItemBtnDetails: string;

  // Scientific Milestones tab
  stagesTitle: string;
  stagesSubtitle: string;
  stagesBabbleTitle: string;
  stagesBabbleDesc: string;
  stagesDrawingTitle: string;
  stagesDrawingDesc: string;
  stagesBehaviorTitle: string;
  stagesBehaviorDesc: string;

  // Language selector label
  langLabel: string;
}

export const TRANSLATIONS: Record<'en' | 'id' | 'zh', AppTranslation> = {
  en: {
    appName: "LITTLE THINGS",
    subTitle: "Charming Baby Babble & Drawing Interpreter",
    tagline: "Bridging scientific developmental psychology with parental wonder to help you decipher your child's magical world.",
    heroHeader: "Tiny Actions, ",
    heroDecoration: "Giant Meanings",
    heroSub: "Let's decode what your little one is really thinking when they make a loud boom, draw a wild scribble, or babble away.",
    backHome: "Back to Home",
    
    tabInterpreter: "Interpreter",
    tabHistory: "Growth Log",
    tabMilestones: "Milestones Guide",
    tabActivities: "Play Planner",
    tabChecklist: "Checklist Tracker",

    presetHeading: "Need Inspiration?",
    presetSub: "Choose a toddler scenario below:",
    presetBabble: "Baby Speak",
    presetDrawing: "Drawing Scribble",
    presetBehavior: "Interaction",

    scenarios: {
      towerCrasherTitle: "The Tower Crasher",
      towerCrasherDesc: "Builds tall blocks over and over, then smashes them down with a loud roar 'BOOM!' while laughing hysterically and doing it all over again.",
      towerCrasherPlaceholder: "Loves building a tall tower of blocks, only to smash it down laughing. He repeats this process over and over.",
      dragonScribbleTitle: "The Guard Dragon Scribble",
      dragonScribbleDesc: "Draws concentric messy red circles over and over on the paper, then proudly claims: 'This is the friendly fire dragon that watches our house at night!'",
      dragonScribblePlaceholder: "My child painted messy overlapping red and yellow circles and said it's a giant dragon guarding our house.",
      bahExplorerTitle: "The 'Bah!' Explorer",
      bahExplorerDesc: "Points excitedly towards the window every afternoon at 4 PM, shouting 'Bah! Bah! Bah!' with wide eyes and bouncing legs.",
      bahExplorerPlaceholder: "Points continuously to the window every evening shouting 'Bah!' high-pitched while looking back at me and smiling."
    },

    formTitle: "Little Things Workspace",
    formReset: "Reset Form",
    formAgeLabel: "How old is your child now?",
    formTypeLabel: "What would you like to interpret?",
    formPromptLabel: "Write the babbles or describe the behavior/drawing",
    formPromptPlaceholderBabble: "Example: Keeps shouting 'Ma-ma-da-da!' with excitement while jumping on the pillow...",
    formPromptPlaceholderDrawing: "Example: Slashed thick black loops over her drawing, then started crying with panic...",
    formPromptPlaceholderBehavior: "Example: Loves arranging plastic spoons on the floor into an extremely straight long line...",
    formPromptSubText: "Min. 5 words for a deep psychological reading",
    formCharCount: "characters",
    formPhotoLabel: "Photo Attachment (Optional)",
    formPhotoRequired: "Upload or Capture Drawing Image (Required)",
    formPhotoSub: "Supports JPG or PNG format (Max 8 MB)",
    formBrowse: "File Library",
    formWebcam: "Use Webcam",
    formCapture: "Capture Photo",
    formCancel: "Cancel",
    formRemoveImage: "Remove Image",
    formSubmitBtn: "Decode Your Little One",
    formSubmitLoading: "Little Things is decoding the meaning...",

    resultsTitle: "Child Development Reading",
    resultsSubtitle: "Interpretation Complete",
    resultsPlaceholder: "Results Will Appear Here",
    resultsWaiting: "Complete the details on the left panel and click 'Decode Your Little One' to start a scientific reading.",
    resultsAnalyzingText: "Analyzing fine motor, emotional expressions, and compiling age-appropriate support suggestions using developmental cognitive psychology foundations.",
    resultsMagicBehindIt: "🌟 The Magic Behind It (Interpretation)",
    resultsHiddenMilestone: "💡 Hidden Milestone",
    resultsPlayfulActionPlan: "🚀 Playful Action Plan",
    resultsEncouragement: "🎈 Word of Encouragement",
    resultsWarningTitle: "Professional Pediatric Advice Advised",
    resultsWarningText: "This milestone entry indicates signs of severe or persistent distress. LITTLE THINGS warmly advises consulting with a pediatrician or professional child developmental clinician to support your child's optimal growth.",
    resultsPsychologistTag: "Psycho-Coach",
    resultsCommitmentTitle: "LITTLE THINGS Safety & Developmental Commitment",
    resultsCommitmentText: "This application serves as a supportive, scientifically grounded parenting guide. It does NOT provide formal clinical medical diagnosis or psychiatric therapy. If your child exhibits severe persistent anxiety, significant speech delays, or other developmental distress, we warmly advise consulting with a credentialed pediatrician or child psychologist to best support your child's growth.",

    historyTitle: "Growth Diary History",
    historySubtitle: "Here is the log of developmental psychology insights you have unlocked for your child so far.",
    historyClearAll: "Delete All History",
    historyClearConfirm: "Are you sure you want to clear your child's entire history log?",
    historyNoItemTitle: "No History Logged Yet",
    historyNoItemDesc: "Analyze your child's first babble, drawing, or behavioral milestone in the 'Interpreter' tab to start your digital growth diary here.",
    historyBtnBack: "Interpret Now",
    historyItemContext: "Context",
    historyItemMilestone: "Milestone Unlocked",
    historyItemReading: "Psychological Reading",
    historyItemBtnDetails: "Load to Workspace",

    stagesTitle: "Child & Toddler Developmental Milestones",
    stagesSubtitle: "How developmental science explains the babbles, curious drawings, and play-based behaviors of children in their precious Golden Age.",
    stagesBabbleTitle: "The Mystery of Babbling (10-18 Mo)",
    stagesBabbleDesc: "Between 10-18 months, infants love articulating double-syllabled vocalizations like 'ma-ma' or 'ba-ba'. This repetition is the neural foundation scaffolding their vocal apparatus and brain's phonological network to prepare for coherent vocabulary.",
    stagesDrawingTitle: "Scribbles & Child Fine Art (2-4 Yrs)",
    stagesDrawingDesc: "Lively loops and black sweeps made by 2-4 year-olds are vital expressions of unstructured thoughts. As motor control develops, children advance to primitive representational stages where a simple circle represents a puppy or a parent's warm hug.",
    stagesBehaviorTitle: "Behavioral Cycles & Action (1-3 Yrs)",
    stagesBehaviorDesc: "Actions exploring spatial bounds (dropping toys or toppling building block towers) are actually intuitive scientific experiments. Toddlers are testing physical boundaries to internalize natural causes and effects.",

    langLabel: "Language"
  },
  id: {
    appName: "LITTLE THINGS",
    subTitle: "Penerjemah Celoteh & Gambar Si Kecil",
    tagline: "Menjembatani psikologi perkembangan anak dengan kasih sayang bunda untuk memahami rahasia dunia si Kecil.",
    heroHeader: "Detail Kecil, ",
    heroDecoration: "Arti Luar Biasa",
    heroSub: "Ayo terjemahkan pikiran si Kecil saat mendengung tertawa, merubuhkan mainan, mencoret abstrak, atau berceloteh manis.",
    backHome: "Kembali ke Utama",
    
    tabInterpreter: "Alat Penerjemah",
    tabHistory: "Catatan Tumbuh",
    tabMilestones: "Panduan Milestone",
    tabActivities: "Rencana Bermain",
    tabChecklist: "Daftar Checklist",

    presetHeading: "Butuh Inspirasi Konten?",
    presetSub: "Pilih skenario bermain buah hati di bawah ini:",
    presetBabble: "Celotehan Anak",
    presetDrawing: "Coretan Gambar",
    presetBehavior: "Tingkah Laku",

    scenarios: {
      towerCrasherTitle: "Si Penghancur Menara",
      towerCrasherDesc: "Membangun susunan balok tinggi berulang kali, lalu menubruknya roboh sambil tertawa riang meneriakkan 'BOOM!' terus menerus.",
      towerCrasherPlaceholder: "Sangat senang membangun menara balok yang tinggi lalu merobohkannya sambil tertawa kencang. Ia mengulang proses ini terus-menerus.",
      dragonScribbleTitle: "Coretan Naga Penjaga Rumah",
      dragonScribbleDesc: "Menggambar lingkaran acak berwarna merah tebal tumpang tindih secara emosional dan bangga berseru: 'Bunda, ini naga api baik yang jaga rumah kita malam-malam!'",
      dragonScribblePlaceholder: "Anak saya menggambar lingkaran bertumpuk warna merah-kuning dan bercerita bahwa itu adalah naga yang menjaga rumah kami.",
      bahExplorerTitle: "Pencari Jendela 'Bah!'",
      bahExplorerDesc: "Menunjuk jendela kamar setiap sore jam 4 sambil berteriak kencang 'Bah! Bah!' dengan mata berbinar dan kaki melonjak girang.",
      bahExplorerPlaceholder: "Menunjuk ke arah luar jendela setiap sore sambil berseru 'Bah!' berulang kali dengan suara melengking lalu menatap saya dan tertawa."
    },

    formTitle: "Lembar Kerja Little Things",
    formReset: "Kosongkan Formulir",
    formAgeLabel: "Berapa usia buah hati saat ini?",
    formTypeLabel: "Apa yang ingin Ibu terjemahkan?",
    formPromptLabel: "Tulis ucapan/celoteh si Kecil atau deskripsikan tingkah lakunya",
    formPromptPlaceholderBabble: "Contoh: Mengoceh 'Ma-ma-da-da!' dengan sangat gembira sambil melompat-lompat di atas bantal...",
    formPromptPlaceholderDrawing: "Contoh: Mencoret melingkar warna hitam tebal di atas gambarnya lalu tiba-tiba menangis panik...",
    formPromptPlaceholderBehavior: "Contoh: Senang mengatur sendok garpu plastik di lantai membentuk barisan garis lurus yang rapi...",
    formPromptSubText: "Minimal 5 kata untuk mendapatkan analisis psikologi sains yang akurat",
    formCharCount: "karakter",
    formPhotoLabel: "Lampiran Foto Si Kecil (Opsional)",
    formPhotoRequired: "Upload / Capture Gambar Coretan Anak (Wajib)",
    formPhotoSub: "Format file JPEG/PNG (Maksimal 8 MB)",
    formBrowse: "Pilih File Gambar",
    formWebcam: "Gunakan Kamera",
    formCapture: "Ambil Foto",
    formCancel: "Batalkan",
    formRemoveImage: "Hapus Foto",
    formSubmitBtn: "Terjemahkan Pikiran si Kecil",
    formSubmitLoading: "Little Things sedang meneliti arti perkembangan...",

    resultsTitle: "Hasil Analisis Psikologi",
    resultsSubtitle: "Penerjemahan Berhasil",
    resultsPlaceholder: "Hasil Analisis Muncul di Sini",
    resultsWaiting: "Lengkapi data anak di panel sebelah kiri lalu tekan tombol 'Terjemahkan Pikiran si Kecil' untuk melihat pembacaan ilmiah.",
    resultsAnalyzingText: "Menganalisis kemampuan motorik halus, ekspresi kognitif emosional, serta meramu saran stimulasi interaktif sesuai dasar-dasar psikologi kognitif Piaget.",
    resultsMagicBehindIt: "🌟 Makna Tersembunyi (Interpretasi)",
    resultsHiddenMilestone: "💡 Milestone Perkembangan",
    resultsPlayfulActionPlan: "🚀 Saran Aktivitas Bermain",
    resultsEncouragement: "🎈 Kata Semangat untuk Ibu-Ayah",
    resultsWarningTitle: "Membutuhkan Konsultasi Profesional",
    resultsWarningText: "Catatan aktivitas ini mengindikasikan tanda stres tinggi atau keterlambatan. LITTLE THINGS menyarankan Anda meluangkan waktu tatap muka bersama dokter spesialis anak atau psikolog perkembangan professional demi mendukung tumbuh kembang optimal.",
    resultsPsychologistTag: "Konselor Psikologi",
    resultsCommitmentTitle: "Komitmen Keamanan & Dukungan LITTLE THINGS",
    resultsCommitmentText: "Aplikasi ini dirancang sebagai panduan pengasuhan interaktif yang menyenangkan berbasis sains perkembangan. Kami tidak menyediakan diagnosis klinis medis ataupun terapi formal. Apabila putra-putri menunjukkan tanda kecemasan ekstrem atau tantangan bicara klinis, silakan konsultasi langsung ke psikolog perkembangan/dokter anak terakreditasi.",

    historyTitle: "Log Diary Tumbuh Kembang",
    historySubtitle: "Daftar rangkuman rahasia psikologi yang telah Ibu buka untuk mendampingi masa emas si Kecil selama ini.",
    historyClearAll: "Hapus Seluruh Catatan",
    historyClearConfirm: "Apakah Anda yakin ingin menghapus seluruh log diary catatan anak Anda?",
    historyNoItemTitle: "Belum Ada Catatan Kecepatan Tumbuh",
    historyNoItemDesc: "Isi celotehan atau upload coretan naga si Kecil pada menu 'Penerjemah' untuk membuat catatan harian milestome emas di sini.",
    historyBtnBack: "MulaiMenerjemahkan",
    historyItemContext: "Konteks Laporan",
    historyItemMilestone: "Milestone Terkait",
    historyItemReading: "Rangkuman Analisis",
    historyItemBtnDetails: "Bawa ke Ruang Kerja",

    stagesTitle: "Pedoman Perkembangan Anak & Bayi (Milestones)",
    stagesSubtitle: "Bagaimana psikologi perkembangan sains memandang celoteh, coretan gambar, dan tingkah laku si Kecil usia emas (Golden Age).",
    stagesBabbleTitle: "Misteri Celoteh (Babble) (10-18 Bulan)",
    stagesBabbleDesc: "Di usia 10-18 bulan, ananda senang meretaskan kata bervokal ganda seperti 'ma-ma' atau 'ba-ba'. Pengulangan ini merupakan pondasi penting melatih pita suara dan sistem fonologis saraf untuk persiapan melafalkan kosa kata lengkap.",
    stagesDrawingTitle: "Seni Coretan (Drawing) (2-4 Tahun)",
    stagesDrawingDesc: "Semburan garis acak khas anak berusia 2-4 tahun adalah bentuk luapan emosi tanpa arah. Seiring berkembangnya motorik halus, ananda masuk ke tingkat representational primitif, di mana satu bulatan mewakili anjing peliharaan atau dekapan bunda.",
    stagesBehaviorTitle: "Siklus Tingkah Laku (1-3 Tahun)",
    stagesBehaviorDesc: "Perilaku balita menguji batas gravitasi (seperti menjatuhkan piring dari meja makan) membantu mereka memahami hukum fisik sebab-akibat (cause and effect) dan melatih sensori spasial.",

    langLabel: "Bahasa"
  },
  zh: {
    appName: "LITTLE THINGS",
    subTitle: "寶寶咿呀學語與塗鴉心理分析助手",
    tagline: "將前沿兒童發展心理學與父母的關愛結合，幫助您破譯孩子奇妙的內心遊戲世界。",
    heroHeader: "微小行為，",
    heroDecoration: "巨大含義",
    heroSub: "讓我們一起破譯寶寶在摔玩具、亂塗亂畫或大聲嘟嚷「叭叭」時的真實想法與快樂情愫。",
    backHome: "返回主頁",
    
    tabInterpreter: "智能解碼",
    tabHistory: "成長日記",
    tabMilestones: "發展里程碑",
    tabActivities: "親子遊戲策劃",
    tabChecklist: "里程碑清單",

    presetHeading: "需要靈感嗎？",
    presetSub: "挑選一個常見的寶寶日常場景進行模擬：",
    presetBabble: "咿呀學語",
    presetDrawing: "藝術塗鴉",
    presetBehavior: "互動行為",

    scenarios: {
      towerCrasherTitle: "高塔摧毀者",
      towerCrasherDesc: "一遍一遍搭建高高的積木，然後伴隨著大喊「砰！」將它們狠狠推倒，咯咯大笑並不斷重複該步驟。",
      towerCrasherPlaceholder: "特別喜歡把積木搭得很高然後笑著推倒它。一遍又一遍地重複這個拆裝探索過程。",
      dragonScribbleTitle: "紅色守護神龍塗鴉",
      dragonScribbleDesc: "在白紙上用粗紅色蠟筆反覆畫一圈圈繁亂的線條，並驕傲地對媽媽稱讚說：『這是晚上在門口守護我們家的噴火巨龍！』",
      dragonScribblePlaceholder: "我的孩子畫了許多重疊繁亂的紅色和黃色圓圈，說這是一隻在晚上守衛我們房子的火龍寶寶。",
      bahExplorerTitle: "指向窗戶的「叭叭」探險家",
      bahExplorerDesc: "每天下午四點整，拉著爸爸激動地指向窗外，睜大雙眼兩腿直蹬不停喊著「叭！叭！叭！」",
      bahExplorerPlaceholder: "每天下午一直指向窗外，興奮地大叫「叭！」，轉過頭盯著我笑，腿不停地蹦跳。"
    },

    formTitle: "Little Things 解碼空間",
    formReset: "重置表單",
    formAgeLabel: "寶寶現在的年齡是多少？",
    formTypeLabel: "您想要分析什麼表現形式？",
    formPromptLabel: "輸入寶寶的聲音語塊或詳細記錄當時的塗鴉/行為動作",
    formPromptPlaceholderBabble: "例：極其激動地反覆喊叫「嘛嘛噠噠！」並抓扯枕頭拼命跳躍...",
    formPromptPlaceholderDrawing: "例：在畫好的小花上塗了一團黑漆漆的圈，然後看起來很委屈焦慮地哭泣...",
    formPromptPlaceholderBehavior: "例：特別喜歡把塑料勺子在地板上排成一條超級長的筆直隊伍...",
    formPromptSubText: "輸入至少 5 個詞，確保兒童心理大數據模型作出高準確度分析",
    formCharCount: "字數",
    formPhotoLabel: "照片附件（可選）",
    formPhotoRequired: "必須上傳或拍攝寶寶的塗鴉圖片",
    formPhotoSub: "支持 JPEG 或 PNG 格式 (最大限制 8 MB)",
    formBrowse: "從手機/相冊上傳",
    formWebcam: "打開攝像頭拍照",
    formCapture: "截圖拍攝",
    formCancel: "取消",
    formRemoveImage: "移除該圖片",
    formSubmitBtn: "破譯寶寶內心秘密",
    formSubmitLoading: "Little Things 正在聯結兒童心理雲進行解碼...",

    resultsTitle: "兒童發展心理評測報告",
    resultsSubtitle: "破譯完成",
    resultsPlaceholder: "分析結果將在這裡實時顯示",
    resultsWaiting: "在左側面板填寫寶寶日常行為記錄，然後點擊「破譯寶寶內心秘密」開始前沿心理學報告讀取。",
    resultsAnalyzingText: "正在分析細微運動技能、情感表達載體，並在皮亞傑認知理論基礎上彙總適齡的高質量早教引導建議。",
    resultsMagicBehindIt: "🌟 寶寶的真實內心世界（解讀）",
    resultsHiddenMilestone: "💡 隱藏發展里程碑",
    resultsPlayfulActionPlan: "🚀 推薦的親子趣味小遊戲",
    resultsEncouragement: "🎈 溫暖的育兒寄語",
    resultsWarningTitle: "建議尋求專業兒科諮詢",
    resultsWarningText: "本次分析透露出寶寶可能存在過度焦慮、痛苦或可能的成長滯後傾向。LITTLE THINGS 溫暖建議您聯繫專業兒科醫生或持證發展心理學家，共助健康成長。",
    resultsPsychologistTag: "育兒金牌教練",
    resultsCommitmentTitle: "LITTLE THINGS 安全與指導承諾",
    resultsCommitmentText: "本應用僅作為極富趣味性和科學啟發性的輔助育兒指南。我們不提供任何形式的醫學診斷或臨床治療依據。如您的孩子存在嚴重的情緒焦慮、異常明顯的語言發育遲緩，請前往醫院診療，在持證醫師的溫和幫助下支持孩子的美好成長。",

    historyTitle: "寶寶成長旅程日誌",
    historySubtitle: "下面是您之前成功解鎖的兒童心理發展理論與成長足跡歸檔。",
    historyClearAll: "清空所有成長史",
    historyClearConfirm: "您確定要清空寶寶的所有歷史成長日誌記錄嗎？該操作不可撤銷。",
    historyNoItemTitle: "還沒有歷史成長足跡",
    historyNoItemDesc: "在「智能解碼」頁面裡提交一段寶寶的咿呀奇遇或紅蠟筆塗鴉，首篇成長日誌就會在這裡誕生！",
    historyBtnBack: "立刻去分析",
    historyItemContext: "事件上下文",
    historyItemMilestone: "解鎖的里程碑項目",
    historyItemReading: "心理師破譯概要",
    historyItemBtnDetails: "同步導入工作區",

    stagesTitle: "寶寶黃金期成長里程碑指南",
    stagesSubtitle: "科學教養如何看待黃金敏感期內孩子的神秘發聲、隨性塗鴉和探索舉措呢？",
    stagesBabbleTitle: "嬰兒的牙牙學語之謎 (10-18個月)",
    stagesBabbleDesc: "在其 10-18 個月大時，寶寶會熱衷發出類似於「媽媽」「嘛嘛」的雙重疊音。這事實上是聲帶聲學肌肉和腦部語音皮質形成成熟邏輯鏈接的重要生理及神經系統演練過程，以此為完整語言誕生作基石奠定。",
    stagesDrawingTitle: "隨手畫線條的藝術張力 (2-4歲)",
    stagesDrawingDesc: "2-4歲期間狂野畫圈或潑墨似的線條是觸覺與重力探索的直覺發洩。隨著空間認知和眼手協調成長，孩子會走進前代表期，此時一個簡單的圓就已被他定義成鄰居家的旺財或母親和煦的笑臉。",
    stagesBehaviorTitle: "破壞行為與因果試錯 (1-3歲)",
    stagesBehaviorDesc: "寶貝故意將裝有水的盤子推倒或大力轟塌辛苦搭建的城堡，並不是在調皮，而是他在研究「萬有引力」並以自己的視角記錄牛頓力學及因果邏輯關係（Cause and effect）。",

    langLabel: "語言 (Traditional Chinese)"
  }
};

// Map localized age categories dynamically based on current selected language key
export function translateAge(age: string, lang: 'id' | 'en' | 'zh'): string {
  if (lang === 'id') {
    switch (age) {
      case '12 Months': return '12 Bulan';
      case '18 Months': return '18 Bulan';
      case '24 Months (2 Years)': return '24 Bulan (2 Tahun)';
      case '3 Years': return '3 Tahun';
      case '4 Years': return '4 Tahun';
      case '5 Years+': return '5 Tahun+';
      default: return age;
    }
  } else if (lang === 'zh') {
    switch (age) {
      case '12 Months': return '12個月';
      case '18 Months': return '18個月';
      case '24 Months (2 Years)': return '24個月 (2歲)';
      case '3 Years': return '3歲';
      case '4 Years': return '4歲';
      case '5 Years+': return '5歲以上';
      default: return age;
    }
  }
  return age; // Default back to English representation
}

// Interactive Milestone checklist items per group
export interface MilestoneChecklistItem {
  id: string;
  category: 'social' | 'language' | 'cognitive' | 'motor';
  enText: string;
  idText: string;
  zhText: string;
}

export const MILESTONE_CHECKLISTS: Record<string, MilestoneChecklistItem[]> = {
  "12 Months": [
    { id: "12m_soc_1", category: 'social', enText: "Waves 'bye-bye' and plays simple interactive games like pat-a-cake", idText: "Melambai 'dah-dah' dan bisa diajak bermain tepuk akur (pat-a-cake)", zhText: "會揮手說「再見」，會玩拍手等簡單的社交遊戲" },
    { id: "12m_lan_1", category: 'language', enText: "Says basic sounds like 'mama' or 'dada' specifically to parents", idText: "Mengucapkan kata sederhana 'mama' atau 'papa' secara terarah", zhText: "會針對父母說出「媽媽」或「爸爸」等特定發音" },
    { id: "12m_cog_1", category: 'cognitive', enText: "Enjoys hiding items and looks for objects in drawing containers", idText: "Gemar menjatuhkan barang lalu mencarinya kembali", zhText: "喜歡把玩具藏起來並會主動尋找被蓋住的物體" },
    { id: "12m_mot_1", category: 'motor', enText: "Pulls up to stand and walks holding onto furniture (crusing)", idText: "Bisa merambat berdiri sambil memegang pinggiran sofa/kursi", zhText: "能扶著家具站立或橫向挪步走（扶行）" }
  ],
  "18 Months": [
    { id: "18m_soc_1", category: 'social', enText: "Points to show others something of high interest", idText: "Menunjuk dengan telunjuk untuk pamer benda menarik", zhText: "會用手指去指好玩的事物以分享他的興奮" },
    { id: "18m_lan_1", category: 'language', enText: "Speaks at least 5 single coherent words besides names", idText: "Mampu mengucapkan minimal 5-10 kata tunggal yang bermakna umum", zhText: "除了名字以外，能說出至少 5 個獨立的有意義單語" },
    { id: "18m_cog_1", category: 'cognitive', enText: "Explores cause and effect; scribbles with crayons spontaneously", idText: "Eksperimen sebab-akibat; coret-coret acak secara mandiri", zhText: "探索因果關係，開始主動拿蠟筆在紙上亂塗畫" },
    { id: "18m_mot_1", category: 'motor', enText: "Walks independently and can scribble circles with crude grip", idText: "Berjalan tegak sendiri tanpa dipegangi dan bisa memegang gelas", zhText: "能獨立穩健行走，能抓著筆畫不規則的一團線" }
  ],
  "24 Months (2 Years)": [
    { id: "24m_soc_1", category: 'social', enText: "Shows parallel play; notices when others are hurt or sad", idText: "Bermain paralel berdampingan; menaruh empati jika teman sedih", zhText: "能和其他小朋友並排玩耍，旁觀並注意到別人的哭泣" },
    { id: "24m_lan_1", category: 'language', enText: "Speaks simple 2-word phrases like 'more milk' or 'eat cookie'", idText: "Menyusun kalimat berisi 2 kata seperti 'minta susu' atau 'mau kue'", zhText: "會說出兩個詞組成的短句（如：喝牛奶、要糖糖）" },
    { id: "24m_cog_1", category: 'cognitive', enText: "Sorts colors and matching shapes; stacks building blocks 4+ high", idText: "Bisa memilah warna-bentuk dasar; menumpuk susun balok 4 tingkat", zhText: "會按顏色或形狀分類，能獨立摞起 4 塊 or 更多積木" },
    { id: "24m_mot_1", category: 'motor', enText: "Runs easily, kicks a beach ball, and jumps off low ledge", idText: "Berlari lincah, menendang bola plastik, melompat ringan", zhText: "跑步輕快，會用腳踢皮球，能雙腳離地跳" }
  ],
  "3 Years": [
    { id: "3y_soc_1", category: 'social', enText: "Takes turns during group play; expresses wide array of emotions", idText: "Mulai mau mengantre bergantian bermain bersama teman", zhText: "願意和同伴輪流玩玩具，用言語簡單流露各種情緒" },
    { id: "3y_lan_1", category: 'language', enText: "Asks 'who?', 'what?', 'where?' often; talks in 3 or 4-word clusters", idText: "Sering melontarkan tanya 'siapa?', 'apa?'; kalimat 3-4 kata", zhText: "狂熱提問「什麼」「哪裡」；能說出 3-4 個詞連貫的完整話" },
    { id: "3y_cog_1", category: 'cognitive', enText: "Draws circles/crosses; role-plays parents or animal actions", idText: "Menggambar bulatan utuh; hobi main peran pura-pura (dokter dll)", zhText: "會臨摹圓形或十字，熱衷玩角色扮演遊戲（扮爸爸媽媽或小貓）" },
    { id: "3y_mot_1", category: 'motor', enText: "Pedals a small tricycle; runs stable without wobbling", idText: "Mengayuh sepeda roda tiga; berlari meliuk tanpa jatuh", zhText: "會騎兒童三輪車，跑步非常平穩而且靈活變向" }
  ],
  "4 Years": [
    { id: "4y_soc_1", category: 'social', enText: "Prefers playing with peers over playing alone; highly imaginative", idText: "Senang berbagi imajinasi liar bersama kawan sebaya", zhText: "更傾向和同伴一起組團做遊戲，富有強烈的創意幻想" },
    { id: "4y_lan_1", category: 'language', enText: "Tells simple stories; uses regular grammar rules (past/present)", idText: "Bisa merangkai dongeng saderhana; berbicara lancar dipahami", zhText: "能複述簡單童話故事，語言流利，發音解說大部清晰" },
    { id: "4y_cog_1", category: 'cognitive', enText: "Draws a person with 3 clear body parts; names a few colors", idText: "Menggambar figur manusia dengan 3 bagian tubuh jelas", zhText: "能畫出包含至少 3 個身體部位的人形，會說出數個顏色名字" },
    { id: "4y_mot_1", category: 'motor', enText: "Balances on one foot for 4+ seconds; catches bounced ball", idText: "Berdiri satu kaki selama 4 detik; menangkap bola memantul", zhText: "能單腳站立平衡 4 秒以上，會雙手接穩彈起的彩球" }
  ],
  "5 Years+": [
    { id: "5y_soc_1", category: 'social', enText: "Wants to please friends; understands differences in rules", idText: "Sangat peduli kenyamanan kawan; paham aturan permainan", zhText: "渴望得到同伴迎合和肯定，能嚴格遵守和理解集體遊戲法則" },
    { id: "5y_lan_1", category: 'language', enText: "Speaks extremely clearly; details a long consecutive string of facts", idText: "Berbicara sangat jernih; lancar merinci cerita kronologis", zhText: "發音咬字完美，能清晰完整地講述漫長的白天經歷" },
    { id: "5y_cog_1", category: 'cognitive', enText: "Counts to 10+; draws houses, animals, and attempts writing names", idText: "Bisa menghitung sampai 10+; menggambar rumah & menulis nama", zhText: "能獨自數數到 10 以上，畫出具象的房屋或小熊，嘗試拼寫名字" },
    { id: "5y_mot_1", category: 'motor', enText: "Hops on one foot; uses child scissors; ties simple knots", idText: "Melompat kelinci satu kaki; pandai potong kertas memakai gunting", zhText: "能單腳連續向前蹦跳，會熟練使用安全剪刀剪窗花" }
  ]
};

// Play planners curated per age group
export interface PlayActivity {
  id: string;
  age: string;
  titleEn: string;
  titleId: string;
  titleZh: string;
  descEn: string;
  descId: string;
  descZh: string;
  category: 'sensory' | 'language' | 'motor' | 'cognitive' | 'social';
  icon: string;
}

export const PLAY_ACTIVITIES: PlayActivity[] = [
  {
    id: "act_1",
    age: "12 Months",
    titleEn: "Sound Mimic Mirroring",
    titleId: "Cermin Tiruan Suara",
    titleZh: "擬音模仿魔鏡",
    descEn: "Repeat baby babbles back with slightly exaggerated pitch. When they say 'da!', say 'Yes, DA!' with wide smiles to build neural speech foundations.",
    descId: "Tiru lagi celoteh buah hati dengan nada gembira yang sedikit dilebihkan. Jika ia berteriak 'da!', sambutlah 'Iya, DA!' untuk memperkuat pita bahasanya.",
    descZh: "在寶寶發出聲段時用誇張喜悅的聲調重複它。如他們喊「噠！」，請笑臉歡迎說「對！噠噠！」，通過強烈的鏡面反射鍛煉聲學腦區神經回路。",
    category: "language",
    icon: "🗣️"
  },
  {
    id: "act_2",
    age: "12 Months",
    titleEn: "Pastel Sensory Bin",
    titleId: "Kotak Sensori Pastel",
    titleZh: "冰豆彩色觸覺箱",
    descEn: "Fill a container with dry oatmeal and soft pastel plastic spoons. Let them scoop and drop to stimulate key tactile paths and gravity tests.",
    descId: "Isi boks kecil dengan gandum oatmeal kering dan sendok-sendok plastik warna pastel lembut. Biarkan si Kecil menyerok lalu menumpahkannya kembali.",
    descZh: "在盆中裝入生燕麥和各種溫暖的扁平圓勺。引導寶寶徒手抓拿、揚灑，建立最初的阻力與萬有引力模型，開發細膩的掌指觸覺系統。",
    category: "sensory",
    icon: "🥣"
  },
  {
    id: "act_3",
    age: "18 Months",
    titleEn: "The Red Box Journey",
    titleId: "Misi Mencari Kotak Merah",
    titleZh: "紅點探寶大作戰",
    descEn: "Hide 2 bright toys in a box. Tell them to seek only the one that is bright red. Helps build neural categorizations and hand-object control.",
    descId: "Sembunyikan 2 mainan di kotak tertutup. Minta buah hati mencari benda yang berwarna merah saja. Melatih ketajaman visual kognitif.",
    descZh: "在大號紙箱裡盛滿彩色小玩具，指定寶寶僅挑選紅色的絨球玩偶。有助於精細化他們的色彩分辨力與深度指令搜尋神經連動。",
    category: "cognitive",
    icon: "📦"
  },
  {
    id: "act_4",
    age: "24 Months (2 Years)",
    titleEn: "Puffy Tape Obstacle",
    titleId: "Jalur Plester Udara",
    titleZh: "貼紙彩虹平衡走",
    descEn: "Stick colored painter's tape lines on the floor. Guide them to balance walk alongside them, testing coordination bounds.",
    descId: "Tempelkan plester kertas berwarna di lantai membentuk jalur berliku. Tuntun mereka berjalan menjaga keseimbangan persis di atas lakban.",
    descZh: "用彩色無殘留膠帶在地板上貼起直角或折線的迷宮，讓孩子雙腳踩線慢慢走過去。極佳地鍛煉他們的小腦本體感和前庭感知平衡。",
    category: "motor",
    icon: "🛣️"
  },
  {
    id: "act_5",
    age: "24 Months (2 Years)",
    titleEn: "Rainbow Clapping Words",
    titleId: "Tepuk Suku Kata",
    titleZh: "彩虹節拍擊掌法",
    descEn: "Sing animal names and clap as you speak syllables: 'GI-RAFFE' (two claps). Encourages early phonetic grouping and attention control.",
    descId: "Sebutkan nama buah atau hewan dengan tepukan tangan per suku kata: 'GA-JAH' (dua tepukan). Memperkuat memori artikulasi fonetis anak.",
    descZh: "一邊大聲讀詞彙一邊有節奏擊掌劃分音節：「長（擊掌）- 頸（擊掌）- 鹿（擊掌）」。極大提升幼兒對字詞構成的語音節奏識別，增加語感儲備。",
    category: "language",
    icon: "👏"
  },
  {
    id: "act_6",
    age: "3 Years",
    titleEn: "Sponge Stamp Mural",
    titleId: "Stempel Spons Warna-Warni",
    titleZh: "海綿飽紙水墨畫",
    descEn: "Cut clean sponges into circles and triangles. Wet them with non-toxic child watercolor paint and stamp them on wide papers to stimulate visual shapes.",
    descId: "Potong spons pencuci piring menjadi bentuk lingkaran dan segitiga. Celupkan ke cat air ramah anak dan stempelkan bebas pada papan karton.",
    descZh: "將溫柔海綿裁剪成經典的圓、星和三角形。浸飽可水洗無毒指畫顏料，讓寶寶按壓在大白紙板上創建抽象風景，啟發具象聯想。",
    category: "sensory",
    icon: "🧽"
  },
  {
    id: "act_7",
    age: "4 Years",
    titleEn: "Emotion Freeze Dance",
    titleId: "Tari Ekspresi Beku",
    titleZh: "情緒百變假人舞",
    descEn: "Play music; tell them to freeze into a specific face expression when music stops ('Show a super excited face!'). Boosts focus & empathy.",
    descId: "Putar lagu ceria; saat musik berhenti, instruksikan anak mematung dengan mimik wajah tertentu ('Hore, tunjukkan muka tersenyum lebar!').",
    descZh: "播放兒歌，指令一旦音樂暫停，寶寶要擺出指定的怪誕表情定格（例如：「展現一個嚇一跳的搞笑臉！」）。大幅開發兒童敏銳的動作響應控制力與情緒感知力。",
    category: "social",
    icon: "🎵"
  },
  {
    id: "act_8",
    age: "5 Years+",
    titleEn: "Tell the Next Chapter",
    titleId: "Dongeng Sambung Kreatif",
    titleZh: "續寫奇遇創想家",
    descEn: "Read their favorite fairy tale book but stop right in the middle: 'If the rabbit took the left path, what happens next?' Sparks logic reasoning.",
    descId: "Bacakan dongeng kesukaan si Kecil, lalu berhenti sesaat di tengah jalan: 'Jika si kura-kura memilih lompat ke sungai, apa yang terjadi selanjutnya?'",
    descZh: "讀一本有趣的繪本，讀到驚險片段時突然合上懸空提問：「如果小鴨子沒有走橋，而是借用荷葉渡江，後面會發生什麼呢？」完全活化幼兒因果故事線閉環組織腦力。",
    category: "cognitive",
    icon: "📖"
  }
];
