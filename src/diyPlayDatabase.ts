export interface DIYGame {
  id: string;
  category: 'sensory' | 'fine_motor' | 'gross_motor';
  ageGroup: '6-12 Months' | '12-24 Months' | '2-3 Years' | '3-5 Years';
  icon: string;
  difficulty: {
    id: string;
    en: string;
    zh: string;
  };
  title: {
    id: string;
    en: string;
    zh: string;
  };
  description: {
    id: string;
    en: string;
    zh: string;
  };
  materials: {
    id: string[];
    en: string[];
    zh: string[];
  };
  steps: {
    id: string[];
    en: string[];
    zh: string[];
  };
  benefit: {
    id: string;
    en: string;
    zh: string;
  };
}

export const DIY_GAMES_DATABASE: DIYGame[] = [
  {
    id: "diy_sensory_rice",
    category: "sensory",
    ageGroup: "12-24 Months",
    icon: "🌾",
    difficulty: { id: "Mudah", en: "Easy", zh: "简单" },
    title: {
      id: "Beras Sensori Pelangi (Rainbow Sensory Rice)",
      en: "Rainbow Sensory Rice",
      zh: "五彩虹霓触觉彩米"
    },
    description: {
      id: "Media belajar taktil warna-warni menggunakan beras dapur mentah yang aman dipegang untuk melatih koordinasi jemari si Kecil.",
      en: "A colorful tactile learning media using uncooked pantry rice, completely safe to hold, to train toddler's grasp coordination.",
      zh: "使用厨房大米制作的彩色触觉学习介质，让宝宝安全抓握，锻炼精细手指动作和色彩感知。"
    },
    materials: {
      id: [
        "2 cangkir beras putih mentah",
        "Pewarna makanan cair (beberapa warna kesukaan)",
        "1 sendok teh cuka makan (untuk merekatkan warna)",
        "Kantong ziplock",
        "Nampan atau wadah lebar"
      ],
      en: [
        "2 cups uncooked white rice",
        "Liquid food coloring (your child's favorite colors)",
        "1 teaspoon white vinegar (to set the bright colors)",
        "Ziplock bags",
        "A wide tray or flat sensory bin"
      ],
      zh: [
        "2杯普通生白米",
        "几滴水性食品色素（挑宝宝喜欢的颜色）",
        "1茶匙白醋（助于锁住鲜艳颜色且防褪色）",
        "密封保鲜袋（Ziplock）",
        "宽敞的浅口托盘或塑料收纳箱"
      ]
    },
    steps: {
      id: [
        "Bagi beras mentah ke dalam beberapa kantong ziplock terpisah sesuai jumlah warna yang ingin dibuat.",
        "Teteskan 4-5 tetes pewarna makanan cair dan 1/2 sendok teh cuka ke dalam masing-masing kantong ziplock.",
        "Tutup rapat ritsleting kantong ziplock, lalu remas-remas dan kocok dengan lembut hingga seluruh butir beras merata terbungkus warna.",
        "Buka kantong, lalu tuangkan masing-masing warna beras di atas nampan datar secara terpisah.",
        "Angin-anginkan selama 1-2 jam di bawah terik matahari atau udara terbuka sampai cuka menguap sepenuhnya dan beras kering kering sentuh.",
        "Letakkan beras pelangi dalam nampan sensori bersama sendok mainan, mangkuk kecil, atau corong untuk mengundang eksplorasi kreatif!"
      ],
      en: [
        "Portion the uncooked rice into separate ziplock bags according to the number of colors you want to make.",
        "Add 4-5 drops of food coloring and 1/2 teaspoon of vinegar into each bag.",
        "Seal the ziplock tightly, then rub and shake the bag gently until every single grain of rice is fully coated with color.",
        "Open the bags and scatter the wet colored rice onto a wide flat baking sheet or tray separated by colors.",
        "Let them air-dry for 1-2 hours until the vinegar smell completely evaporates and the rice is dry to the touch.",
        "Place the finished rainbow rice into a clean sensory bin alongside toy cups, scoops, or funnels for endless physical play!"
      ],
      zh: [
        "根据想要涂刷的色彩数量，将生米分成几份，分别倒入不同的密封保鲜袋中。",
        "往每个保鲜袋中滴入4-5滴液体食品色素，以及半茶匙白醋。",
        "拉满拉链密封保鲜袋，用双手揉捏、摇匀保鲜袋，直到所有的米粒都均匀裹上鲜红、明黄或亮蓝色。",
        "打开封口，将各色大米平铺倒在干净的平底托盘上（使颜色区分开来）。",
        "在阳光下或通风处晾干1-2小时，直至醋味完全消散、大米干燥不粘手。",
        "最后将干燥好得彩虹彩米汇入宝宝的大沙盘中，配上小勺、漏斗、小碗引诱孩子开始疯狂探秘啦！"
      ]
    },
    benefit: {
      id: "Meningkatkan sensitivitas saraf sensorik di ujung jari, melatih kekuatan menjumput, dan mengenalkan dasar volume (mengisi & mengosongkan wadah).",
      en: "Stimulates nervous tactile pathways at fingertips, strengthens pincer grasp muscles, and introduces physical volume calculations (pouring & scooping).",
      zh: "高强度刺激指尖触觉神经末梢，训练双指捏合力，并建立物理体积的初级认知（装满与倾倒）。"
    }
  },
  {
    id: "diy_sensory_gel_bag",
    category: "sensory",
    ageGroup: "6-12 Months",
    icon: "🧴",
    difficulty: { id: "Mudah", en: "Easy", zh: "简单" },
    title: {
      id: "Kantong Gel Sensori Antigatal (Magic Sensory Gel Bag)",
      en: "Magic Sensory Gel Bag",
      zh: "魔法防漏无毒触觉凝胶袋"
    },
    description: {
      id: "Eksplorasi sensorik basah tanpa takut kotor dengan kantong bersegel tebal yang ramah bayi untuk melatih gerakan motorik memencet.",
      en: "A mess-free wet sensory exploration utilizing baby-safe sealed bags, perfect for training squishy press motors safely.",
      zh: "利用加厚密封袋填充婴儿安全凝胶，进行彻底无污染的湿润触觉探索，完全不弄脏小手和地板。"
    },
    materials: {
      id: [
        "1 kantong ziplock tebal ukuran sedang (zipper tebal)",
        "1 botol gel rambut bening murah (atau hand sanitizer bening)",
        "Pewarna makanan (2-3 warna berbeda, beberapa tetes)",
        "Kancing baju hiasan mengkilap, glitter, atau manik-manik kecil",
        "Lakban kertas tebal"
      ],
      en: [
        "1 medium premium ziplock bag (thick freezer bags work best)",
        "1 tube or bottle of cheap clear hair gel (or clear aloe gel)",
        "Food coloring (2-3 colors, a few drops)",
        "Bright colorful buttons, sparkles, sequins, or tiny flat plastic stars",
        "Heavy-duty packing tape or duct tape"
      ],
      zh: [
        "1个中型厚质地密封袋（冷冻专用封口保鲜袋极佳）",
        "1瓶廉价的透明啫喱发胶（或者透明芦荟凝胶）",
        "水性食品色素（2-3种颜色，只需几滴）",
        "各种彩亮多维扣子、金葱闪粉、亮片或塑料小五角星",
        "强力防水宽透明封箱胶带或强力胶带"
      ]
    },
    steps: {
      id: [
        "Buka kantong ziplock, lalu pencet gel rambut bening ke dalam kantong hingga terisi kira-kira setengah botol.",
        "Masukkan beberapa tetes pewarna makanan pilihan secara terpisah di dalam kantong gel.",
        "Masukkan kancing warna-warni, manik-manik, atau glitter berkilauan di atas gel rambut.",
        "Baringkan kantong ziplock di atas meja datar, lalu perlahan dorong keluar seluruh sisa gelembung udara mengambang dari bawah ke arah mulut ziplock sebelum ditutup rapat.",
        "Gunakan lakban tebal untuk menempel dan menyegel keempat ujung sisi luar kantong ziplock di meja atau di ubin lantai.",
        "Biarkan bayi berbaring (belly time) atau duduk bersandar, memencet, mendorong kancing dengan ujung jari menyusuri kantong gel dingin!"
      ],
      en: [
        "Open your ziplock bag and squeeze a good amount of clear hair gel inside until it's about half-filled.",
        "Add food coloring drops separately to different areas of the gel inside the bag.",
        "Toss in colorful buttons, sparkling sequins, or flat smooth items onto the gel bedding.",
        "Lay the bag flat on a table, and gently slide your hand to sweep out any trapped air bubbles towards the zipper opening, then seal tightly.",
        "Use heavy-duty tape to wrap and seal all four sides of the ziplock bag securely onto the nursery floor or window pane.",
        "Let baby lie down (tummy time) or sit, joyfully squishing and guiding the floating items across the cool gel with absolute safety!"
      ],
      zh: [
        "打开密封袋，将大约半瓶的透明啫喱发胶或芦荟胶挤入袋子中。",
        "在凝胶层的不同位置分别滴入几滴颜料，使其形成色彩分割点。",
        "将彩色塑料纽扣、亮片或五角星均匀扔入凝胶之上。",
        "将密封袋平放在桌面上，用手掌从底部向封口方向轻轻推抹，挤出所有残余的空气气泡，然后严密扣紧封口。",
        "使用强力封箱胶带把密封袋的四周边缘严密裹包，最好直接粘在儿童推椅桌面或明亮窗玻璃上。",
        "让宝宝趴着（趴着玩时间）或坐着，开心地隔着袋子戳揉、挤压，感受冰凉柔软的滑动触觉！"
      ]
    },
    benefit: {
      id: "Meningkatkan kekuatan motorik halus telapak tangan, merangsang pemahaman gerak aksi-reaksi, dan menenangkan emosi anak dengan pijatan taktil aman.",
      en: "Fosters early finger-pointing muscles, introduces physical action-reaction causes, and has a calming sensory feedback on hyperactive emotions.",
      zh: "高度锻炼手指独立的推按指肌力，诱发因果物理逻辑，并具有极佳的舒缓情绪和抗焦虑抚慰作用。"
    }
  },
  {
    id: "diy_kancing_pintar",
    category: "fine_motor",
    ageGroup: "12-24 Months",
    icon: "📦",
    difficulty: { id: "Mudah", en: "Easy", zh: "简单" },
    title: {
      id: "Kotak Tabungan Kancing Pintar (Cardboard Post Box)",
      en: "Cardboard Post Box",
      zh: "硬纸鞋箱巧塞彩色扣"
    },
    description: {
      id: "Melatih kekuatan tangan menjumput benda tipis koordinasi mata-tangan dengan kotak celengan kancing warna-warni sederhana.",
      en: "Trains eye-hand precision coordination & pincer grasp using a simple colorful button sorting shoe box bank.",
      zh: "利用闲置的废弃鞋盒挖孔，训练宝宝使用双指（大拇指和食指）精准抓取、倾斜塞入的智力练习。"
    },
    materials: {
      id: [
        "1 kotak sepatu bekas berpenutup",
        "Kancing baju ukuran besar (diameter minimal 3 cm agar aman tidak tertelan)",
        "Cutter atau silet tajam",
        "Spidol warna-warni (merah, biru, hijau, kuning)",
        "Kertas warna atau bungkus kado bekas"
      ],
      en: [
        "1 empty cardboard shoe box with a lid",
        "Jumbo/large plastic craft buttons (Minimum 3 cm diameter for choking prevention safety)",
        "A sharp razor or utility cutter (Adult use only)",
        "Colorful markers (Red, blue, green, yellow)",
        "Bright leftover wrapping paper or colored papers"
      ],
      zh: [
        "1个带盖的废弃硬纸鞋盒/礼品盒",
        "大号塑料纽扣（直径必须大于3厘米，以防宝宝误吞）",
        "美工刀或坚硬刀具（仅供家长使用）",
        "各多彩马克笔（红、蓝、黄、绿）",
        "彩色卡纸或包装纸"
      ]
    },
    steps: {
      id: [
        "Bungkus bagian luar kotak sepatu bekas menggunakan kertas kado cerah agar terlihat mengundang.",
        "Pada bagian tutup kotak, buatlah 4-5 celah lubang memanjang seukuran kancing besar menggunakan cutter secara rapi.",
        "Gunakan spidol berwarna untuk mewarnai tepian keliling masing-masing lubang (contoh: warnai keliling lubang pertama warna merah, lubang kedua warna biru, dst).",
        "Grupkan kancing baju besar berdasarkan warnanya yang serasi di wadah kecil.",
        "Tunjukkan cara memegang kancing dengan jempol dan telunjuk (pincer grasp), lalu masukkan kancing merah ke dalam lubang bertepi merah.",
        "Minta anak melakukan hal serupa berulang sampai seluruh kancing terisi habis, lalu dengarkan bunyi lentuman kancing jatuh!"
      ],
      en: [
        "Cover the outside of the shoe box with vibrant wrapping paper so it looks highly enticing to your toddler.",
        "On the cardboard lid, cut 4-5 neat horizontal slots spacious enough for the jumbo buttons to slip through using a cutter.",
        "Color the matching border outline of each slot with direct colored markers (e.g., color one slot's rim red, another blue, etc.).",
        "Sort and place the jumbo buttons into a separate small feeding mug/plate next to the box.",
        "Demonstrate the action: do a pincer grasp with thumb and index, line up the colored button and slide it into the matching slot color.",
        "Encourage your toddler to repeat and drop them all, enjoying the satisfying hollow rattle of the plastic buttons hitting the bottom!"
      ],
      zh: [
        "用亮丽的卡通礼品包装纸把鞋盒外部包裹，增加其视觉吸引力。",
        "拿起鞋盒顶盖，用美工刀小心整齐地挖出4-5个扁平窄缝（尺寸略微宽于纽扣厚度），排列开来。",
        "用彩色马克笔分别沿挖出的窄缝边缘进行勾边染色（例如一号孔涂红色，二号孔涂蓝色）。",
        "将五颜六色的大纽扣打散混合装在盒旁的小塑料盘子里。",
        "向宝宝演示一遍如何使用大拇指和食指紧紧捏住扣子外缘，倾斜对准槽口，然后利索投放进去。",
        "放手让孩子独立尝试分类投放。听着塑料扣子掉落鞋盒底发出清脆的回响，宝宝会感到无上满足！"
      ]
    },
    benefit: {
      id: "Menguatkan formasi otot jemari 'pincer grasp' yang sangat penting untuk melatih kemandirian memegang pensil kelak, mengasah penalaran klasifikasi warna ganda.",
      en: "Supercharges the 'pincer grasp' muscle structure vital for writing and holding spoons later, refines spatial rotation alignment, and boosts color grouping skills.",
      zh: "高能训练写字、捏笔必备的双手“钳形捏拿”手指小肌群，锻炼空间判断方向，以及初级的大脑多维分类逻辑。"
    }
  },
  {
    id: "diy_ribbon_cardboard",
    category: "fine_motor",
    ageGroup: "2-3 Years",
    icon: "🧶",
    difficulty: { id: "Sedang", en: "Medium", zh: "中等" },
    title: {
      id: "Papan Tenun Pita Lusuh (Cardboard Ribbon Weaver)",
      en: "Cardboard Ribbon Weaver",
      zh: "手工穿织彩带穿梭板"
    },
    description: {
      id: "Melatih anak membuat anyaman tenun manual menggunakan sisa kardus bekas dan pita untuk menstimulasi gerak koordinasi dua tangan berpasangan.",
      en: "Teaches manual braiding/threading using leftover cardboard sheets and colorful ribbon slats to stimulate left-right hand pairing.",
      zh: "利用简易的废硬纸板与彩带，带领孩子进行“上穿、下穿”的梭形编织游戏，训练双手协同。"
    },
    materials: {
      id: [
        "Papan kardus tebal datar ukuran buku tulis",
        "Pita satin warna krep, renda kain bekas, atau tali sepatu",
        "Selotip / lakban bening",
        "Gunting",
        "Sumpit kayu untuk membolongi"
      ],
      en: [
        "A flat rigid cardboard placard (Size of an average spiral notebook)",
        "Satin ribbons, scrap laces, colored shoestrings, or thick threads",
        "Painter's tape or sticky tape",
        "Scissors",
        "A wooden chopstick or pencil to poke guide notches"
      ],
      zh: [
        "一块平整、坚硬的普通废硬板箱纸（约笔记本电脑屏幕大小）",
        "彩色缎皮彩带、碎衣服花边绳、彩色鞋带或粗线绳",
        "普通透明胶带",
        "剪刀",
        "一根木筷或尖铅笔（用于戳出引导网孔）"
      ]
    },
    steps: {
      id: [
        "Gunting kardus tebal datar sejajar membentuk persegi rapi.",
        "Gunakan sumpit kayu untuk melubangi kardus beberapa lubang berjejer horizontal pada sisi atas dan sejajar lurus di sisi bawah (beri jarak 3 cm tiap lubang).",
        "Gunting pita satin memanjang seukuran 2 kali tinggi kardus.",
        "Masukkan pita secara tegak lurus dari lubang atas ditarik ke lubang bawah. Rekatkan ujung pita di bagian belakang papan kardus menggunakan selotip sehingga sekarang papan memiliki jeruji pita merah-biru yang tegak lurus.",
        "Berikan sisa pita satin kain horizontal berbeda warna kepada anak.",
        "Ajari anak cara mertenun pita horizontal tersebut masuk-keluar-masuk-keluar di bawah dan di atas jajaran pita vertikal secara rapi."
      ],
      en: [
        "Cut your thick cardboard placard into a clean square/rectangle panel.",
        "Use a wooden chopstick or pen tip to poke a row of aligned small holes on the upper edge, and a matching row along the bottom edge (space them roughly 3 cm apart).",
        "Cut strips of satin ribbon twice the height of your cardboard panel.",
        "Thread the ribbons vertically from the upper hole to the lower hole. Secure both raw ribbon tails on the backside of the cardboard sheet with tape, creating vertical warp stripes.",
        "Provide your toddler with different-colored horizontal ribbon slats or laces.",
        "Show them how to weave the horizontal ribbons in an alternating over-and-under-and-over-again pattern across the vertical fence!"
      ],
      zh: [
        "将厚硬纸板裁剪成规则清爽的方形。左右侧修边。",
        "用木筷或硬笔尖在卡纸的上册边缘戳起一排平行水平等距的小孔，并于底端边缘正对着也戳出相应的小孔（大约相隔3厘米）。",
        "将彩带切成长条段，长度要是纸板高度的两倍。",
        "将彩带从上孔穿至下孔绷直。在纸板背面用胶带把头尾牢牢粘住，形成一排整齐的彩色垂直“经纱经线”。",
        "再把剩余的其他反差色横向彩带、彩条或毛线交到宝宝手中。",
        "握着宝宝的手，教他们像织布梭子一样，横向“上一层、下一层、再上一层”地将彩带交错穿梭水平排开来。"
      ]
    },
    benefit: {
      id: "Mengasah perkembangan motorik halus koordinasi tangan kiri (memegang papan) dan tangan kanan (menenun untaian), melatih kemandirian spasial pola selang-seling.",
      en: "Sharpens bimanual coordination (left hand stabilization, right hand dynamic weaving), builds focus stamina, and boosts spatial logic pattern repetitions.",
      zh: "高阶开发左手撑扶卡板、右手动态穿针引线的精巧眼手脑平衡，稳步增加儿童专注注意力持有时长。"
    }
  },
  {
    id: "diy_laser_maze",
    category: "gross_motor",
    ageGroup: "3-5 Years",
    icon: "🏃",
    difficulty: { id: "Menantang", en: "Challenging", zh: "极富挑战" },
    title: {
      id: "Detektif Sinar Laser Tali (Laser Obstacle Maze)",
      en: "Laser Obstacle Maze",
      zh: "红外线激光密室大逃脱"
    },
    description: {
      id: "Tantangan fisik melenturkan raga melompati rintangan tali laser buatan sendiri di selasar lorong rumah untuk kelincahan motorik kasar.",
      en: "A physical bending challenge climbing over customized yarn laser barriers inside the house hallway for gross motor agility.",
      zh: "在家里狭长走廊两侧拉起横七竖八的彩绳或彩色胶带，模拟激光红外线防盗门，引导孩子匍匐弯腰穿过去。"
    },
    materials: {
      id: [
        "1 roll tali rafia merah, benang wol tebal, atau pita krep panjang",
        "Selotip dinding / lakban kertas (agar tidak merusak cat dinding)",
        "Lorong gang sempit rumah atau ruang di antara baris kursi makan"
      ],
      en: [
        "1 roll of bright red twine, yarn, or crepe-paper streamers",
        "Wall-safe painter's tape or blue tape (to avoid scaling paint off the walls)",
        "An empty home hallway, long passage, or space between dining chairs"
      ],
      zh: [
        "1卷亮红色塑料包装绳、红毛线或绉纸彩带条",
        "墙面无痕美纹纸胶布或易撕蓝胶带（绝不扯落或伤害家中粉白墙体）",
        "家里狭长的过道、玄关廊道或两排餐桌椅形成的夹道"
      ]
    },
    steps: {
      id: [
        "Tentukan lorong rumah kosong yang minim perabot tajam.",
        "Potong beberapa helai tali rafia merah bervariasi dari ukuran 1,5 meter hingga 2 meter.",
        "Tempelkan ujung tali di dinding kiri lorong dan ujung satunya di dinding kanan secara silang menyilang memakai selotip kertas.",
        "Variasikan ketinggian tali: ada yang sangat rendah (10 cm dari lantai), tinggi (70 cm dari lantai), berbenturan miring atau zig-zag sehingga menyerupai sinar pertahanan laser detektif.",
        "Letakkan benda mainan kado di ujung lorong luar seakan-akan merupakan harta karun misi.",
        "Minta anak melakukan aksi detektif dengan merangkak tengkurap, membungkukkan badan, melangkahi tali perlahan agar tidak tersentuh!"
      ],
      en: [
        "Find a quiet, clutter-free hallway or passage inside the house without sharp furniture edges.",
        "Cut several strands of red string/crepe paper ranging between 1.5 meters to 2 meters.",
        "Tape one end of each string to the left wall and the opposite end to the right wall in criss-cross geometric directions using painter's tape.",
        "Vary the vertical altitudes: tape some extremely low (10 cm high for crawling under), some middle-high (70 cm for scaling over), and diagonal paths that mimic laser lasers.",
        "Place a cute mystery toy 'treasure' at the far end of the passageway to serve as the mission's goal.",
        "Brief your 'secret agent' to crawl, duck, slide, bend, or stretch across the passage without hitting any laser lasers to claim the prize!"
      ],
      zh: [
        "挑选一条通风好、没有任何尖锐边角的长廊走道或客厅空间。",
        "将红色绳子或绉纸剪成几段，根据过道宽度裁剪成 1.5 到 2 米长条。",
        "使用易撕美纹胶带将绳条一头粘在左墙壁，一头倾斜交叉地贴在右侧墙壁，形成立体几何网。",
        "把控不同绳条的高度悬殊：有的离地十厘米（需要匍匐前进），有的处于腰部高度（需要凌空抬跨），纵横交错组成密网。",
        "在走廊底端的安全终点放置一个宝宝极其想搜集的小黄鸭或水果糖作为“终极密保宝藏”。",
        "大声宣布“Detektive Mode ON!”，要求小小特工弯下腰、抱住胸脯或抬大腿，闪转挪腾穿行密布过道！"
      ]
    },
    benefit: {
      id: "Melatih motorik kasar dinamis seluruh otot sendi kaki-tangan, melatih kesadaran motorik koordinasi keseimbangan vestibular, dan merangsang kelincahan refleks gerak.",
      en: "Fosters full-body gross motor muscles in arms and legs, improves vestibular sensory balance coordination, and boosts physical self-regulation reflexes.",
      zh: "高频燃烧大腿和双臂全身极性大肌群，强化感觉统合中的本体感受和平衡觉，提升动作反应敏捷性。"
    }
  },
  {
    id: "diy_waterfalls_pouring",
    category: "sensory",
    ageGroup: "2-3 Years",
    icon: "🚿",
    difficulty: { id: "Sedang", en: "Medium", zh: "中等" },
    title: {
      id: "Pancuran Air Terjun Botol (Water Pouring Waterfalls)",
      en: "Water Pouring Waterfalls",
      zh: "阶梯积木瓶子飞流瀑布"
    },
    description: {
      id: "Eksplorasi gravitasi air sederhana menggunakan barang plastik dapur bekas diletakkan berundak di dinding kamar mandi.",
      en: "A simple liquid gravity waterfall experiment using recycled plastic bottles mounted at heights on bathroom walls.",
      zh: "收集生活中无用的小可乐瓶塑料瓶，裁剪后层叠粘在洗手间墙壁，通过倾倒水花探索重力与物理流动规律。"
    },
    materials: {
      id: [
        "3-4 botol plastik minuman bekas bekas pakai",
        "Gunting besar",
        "Paku tusuk kecil atau jarum kasur",
        "Double tape foam kamar mandi tebal berdinding basah",
        "Gayung plastik kecil atau cangkir ukur"
      ],
      en: [
        "3-4 empty washed recycle soda or water plastic bottles",
        "Durable standard scissors",
        "A push pin or metal needle to punch drain holes (Adult use only)",
        "Weatherproof double-sided foam tape suitable for wet walls",
        "A small pouring cup, measuring scoop, or kitchen funnel"
      ],
      zh: [
        "3-4个废弃洗净的可乐、塑料汽水或矿泉水瓶",
        "一把大塑料剪刀",
        "一枚尖金属大头针或按钉（仅供家长扎孔使用）",
        "厚款强力防水双面发泡胶带（适合湿滑卫生间瓷砖）",
        "小舀水勺、量筒或塑料漏斗"
      ]
    },
    steps: {
      id: [
        "Cuci bersih botol-botol minuman plastik kosong bekas pakai.",
        "Potong bagian tengah botol miring menggunakan gunting agar membentuk corong wadah terbuka lebar untuk disiram air.",
        "Pada bagian bawah/tutup botol beberapa botol, tusuklah paku kecil secara hati-hati sebanyak 4-5 lobang halus untuk menciptakan tetesan aliran menyerupai hujan rintik.",
        "Tempelkan potongan botol-botol terbalik tersebut secara mengalir dari berundak paling atas ke bawah di dinding keramik kamar mandi yang kering layu menggunakan double-tape busa.",
        "Isi wadah ember mandi air hangat dan campur setetes pewarna makanan biru jika mau terkesan mewah.",
        "Mintalah anak mengambil gayung air, menumpahkannya ke botol paling atas, lalu bertepuk tangan gembira melihat air meluncur tumpah ke botol-botol di bawahnya!"
      ],
      en: [
        "Clean and rinse the empty plastic recycle bottles thoroughly.",
        "Cut the bottles in half using scissors. Cut the tops off diagonally to form broad funnel cups open for scooping and pouring water.",
        "Poke several pinholes into some bottle caps or bases using a needle to generate different rainfall patterns of dripping streams.",
        "Use water-resistant double-sided foam tape to securely mount correct cascading funnels in a descending tree order on your tile bath wall.",
        "Mix cozy warm tub water with a solitary drop of blue food coloring to simulate wild ocean water.",
        "Provide your child with a pouring scoop, and prompt them to dump water into the topmost funnel to watch gravity cascade it beautifully downwards!"
      ],
      zh: [
        "将空矿泉水瓶或大饮料瓶彻底冲洗晾干。",
        "用剪刀从瓶子中部剪开，上方斜着修剪，使其成为口径朝上、便于接水的塑料大漏斗。",
        "用针在部分瓶盖或瓶身下侧密密戳出4-5个细微毛眼孔，以形成雨丝般的细小水淋效果。",
        "用防水纳米无痕双面海绵胶带，在浴室干燥的瓷砖墙壁上，将漏斗按“自上而下、左倾右斜”的阶梯悬挂好。",
        "给小面盆里盛上温水（若想好玩刺激也可以加入两滴纯天然食用蓝色色素模拟海水蓝色）。",
        "给宝宝一个小杯子或舀水勺，引导他们舀水向最上方的漏斗瓶子里浇灌。看着水流层层倾泻欢腾落下，宝宝一定开心得跳脚！"
      ]
    },
    benefit: {
      id: "Mengajarkan anak konsep aliran sebab-akibat gravitasi dasar, melatih keseimbangan genggaman otot jari menuangkan wadah air.",
      en: "Gives hands-on visualization of gravity cascades and cause-and-effect science, refines arm wrist tilt control, and satisfies sensory interest in fluid motion.",
      zh: "极直观地感受物理重力和液体流动因果科学，提高手肘、手腕精细控水肌肉，满足对流动事物的天然好奇。"
    }
  }
];
