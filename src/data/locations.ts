/**
 * Dữ liệu hành trình. Muốn thêm/bớt/sửa địa điểm chỉ cần chỉnh file này:
 * - Số lượng địa điểm, thứ tự, tiến độ "X/N" đều tự tính theo mảng LOCATIONS.
 * - `image`: đường dẫn ảnh trong /public (vd: '/images/le-quy-don.jpg'). Bỏ trống sẽ hiện ảnh minh họa tạm.
 * - `map`: toạ độ ghim trên bản đồ minh hoạ (khung 1000 x 700), `labelSide` là phía đặt tên địa điểm.
 */

export type SectionKey = 'A' | 'B' | 'C';

export type ContentBlock = { type: 'paragraph'; text: string } | { type: 'list'; heading?: string; items: string[] };

export type LocationSection = {
  key: SectionKey;
  title: string;
  content: ContentBlock[];
};

export type JourneyLocation = {
  id: string;
  slug: string;
  name: string;
  /** Nhãn tiêu đề ở đầu trang chi tiết. Địa điểm đầu tiên là "NƠI BẮT ĐẦU". */
  label: string;
  subtitle: string;
  facts: { label: string; value: string }[];
  image?: string;
  imageAlt: string;
  map: { x: number; y: number; labelSide: 'left' | 'right' };
  sections: [LocationSection, LocationSection, LocationSection];
};

export const SECTION_TITLES: Record<SectionKey, string> = {
  A: 'Lịch sử',
  B: 'Đặc điểm và giá trị di sản',
  C: 'Giải pháp bảo tồn và phát huy',
};

export const LOCATIONS: JourneyLocation[] = [
  {
    id: 'le-quy-don',
    slug: 'truong-thpt-le-quy-don',
    name: 'Trường THPT Lê Quý Đôn',
    label: 'NƠI BẮT ĐẦU',
    subtitle: 'Mái trường gần 150 năm tuổi, nơi lưu giữ truyền thống hiếu học của Sài Gòn',
    facts: [
      { label: 'Khởi công', value: '1874' },
      { label: 'Hoàn thành', value: '1877' },
      { label: 'Mang tên Lê Quý Đôn', value: '1977' },
    ],
    imageAlt: 'Trường THPT Lê Quý Đôn với kiến trúc trường học cổ thời Pháp thuộc',
    map: { x: 330, y: 440, labelSide: 'left' },
    sections: [
      {
        key: 'A',
        title: SECTION_TITLES.A,
        content: [
          {
            type: 'paragraph',
            text: 'Trường được xây dựng từ năm 1874, hoàn thành năm 1877. Trải qua nhiều lần đổi tên, trường chính thức mang tên THPT Lê Quý Đôn vào năm 1977.',
          },
        ],
      },
      {
        key: 'B',
        title: SECTION_TITLES.B,
        content: [
          {
            type: 'list',
            items: [
              'Kiến trúc trường học cổ mang dấu ấn thời Pháp thuộc.',
              'Gắn liền với lịch sử giáo dục Sài Gòn – TP. Hồ Chí Minh.',
              'Thể hiện truyền thống hiếu học và lưu giữ ký ức của nhiều thế hệ học sinh.',
            ],
          },
        ],
      },
      {
        key: 'C',
        title: SECTION_TITLES.C,
        content: [
          {
            type: 'list',
            heading: 'Giải pháp bảo tồn',
            items: [
              'Tu bổ công trình, giữ gìn kiến trúc cổ.',
              'Lưu trữ hình ảnh, hồ sơ và kỷ vật lịch sử.',
              'Nâng cao ý thức bảo vệ di sản trong học sinh.',
            ],
          },
          {
            type: 'list',
            heading: 'Giải pháp phát huy',
            items: [
              'Tổ chức triển lãm, ngoại khóa tìm hiểu lịch sử trường.',
              'Giới thiệu di sản qua website, mạng xã hội và hoạt động giao lưu cựu học sinh.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'bao-tang-chung-tich',
    slug: 'bao-tang-chung-tich-chien-tranh',
    name: 'Bảo tàng Chứng tích Chiến tranh',
    label: 'NƠI LƯU GIỮ KÝ ỨC',
    subtitle: 'Những chứng tích lặng im, một thông điệp hòa bình vang xa',
    facts: [{ label: 'Thành lập', value: '4/9/1975' }],
    imageAlt: 'Bảo tàng Chứng tích Chiến tranh',
    map: { x: 400, y: 300, labelSide: 'left' },
    sections: [
      {
        key: 'A',
        title: SECTION_TITLES.A,
        content: [
          {
            type: 'paragraph',
            text: 'Bảo tàng được thành lập ngày 4/9/1975, nhằm lưu giữ và trưng bày tư liệu, hình ảnh, hiện vật về chiến tranh Việt Nam.',
          },
        ],
      },
      {
        key: 'B',
        title: SECTION_TITLES.B,
        content: [
          {
            type: 'list',
            items: [
              'Lưu giữ nhiều hình ảnh, hiện vật và tài liệu lịch sử.',
              'Giúp thế hệ trẻ hiểu về hậu quả chiến tranh và lịch sử dân tộc.',
              'Truyền tải thông điệp hòa bình, nhân văn và tình đoàn kết.',
            ],
          },
        ],
      },
      {
        key: 'C',
        title: SECTION_TITLES.C,
        content: [
          {
            type: 'list',
            heading: 'Giải pháp bảo tồn',
            items: [
              'Bảo quản, phục chế hiện vật đúng chuyên môn.',
              'Số hóa hình ảnh và tài liệu để lưu trữ lâu dài.',
              'Bảo vệ không gian trưng bày và hiện vật.',
            ],
          },
          {
            type: 'list',
            heading: 'Giải pháp phát huy',
            items: [
              'Tổ chức triển lãm chuyên đề, hoạt động giáo dục lịch sử.',
              'Ứng dụng công nghệ tương tác, thuyết minh đa ngôn ngữ.',
              'Quảng bá thông điệp hòa bình qua các phương tiện truyền thông.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'dinh-doc-lap',
    slug: 'dinh-doc-lap',
    name: 'Dinh Độc Lập',
    label: 'NƠI LỊCH SỬ SANG TRANG',
    subtitle: 'Công trình kiến trúc ghi dấu ngày thống nhất đất nước 30/4/1975',
    facts: [
      { label: 'Dinh Norodom', value: '1868' },
      { label: 'Khánh thành', value: '1966' },
      { label: 'Kiến trúc sư', value: 'Ngô Viết Thụ' },
    ],
    imageAlt: 'Dinh Độc Lập với mặt tiền kiến trúc hiện đại',
    map: { x: 545, y: 400, labelSide: 'right' },
    sections: [
      {
        key: 'A',
        title: SECTION_TITLES.A,
        content: [
          {
            type: 'paragraph',
            text: 'Dinh có nguồn gốc từ Dinh Norodom, xây dựng từ năm 1868. Công trình hiện nay được kiến trúc sư Ngô Viết Thụ thiết kế, khánh thành năm 1966. Ngày 30/4/1975, nơi đây ghi dấu sự kiện kết thúc chiến tranh, thống nhất đất nước.',
          },
        ],
      },
      {
        key: 'B',
        title: SECTION_TITLES.B,
        content: [
          {
            type: 'list',
            items: [
              'Kiến trúc hiện đại kết hợp yếu tố văn hóa phương Đông.',
              'Gắn liền với những sự kiện chính trị quan trọng của Việt Nam.',
              'Lưu giữ nhiều hiện vật, tư liệu có giá trị lịch sử và giáo dục.',
            ],
          },
        ],
      },
      {
        key: 'C',
        title: SECTION_TITLES.C,
        content: [
          {
            type: 'list',
            heading: 'Giải pháp bảo tồn',
            items: [
              'Tu bổ công trình, bảo quản nội thất và hiện vật.',
              'Quản lý khách tham quan, tránh làm hư hại di tích.',
              'Kiểm tra định kỳ và bảo vệ cảnh quan.',
            ],
          },
          {
            type: 'list',
            heading: 'Giải pháp phát huy',
            items: [
              'Tổ chức tham quan, ngoại khóa tìm hiểu lịch sử.',
              'Sử dụng mã QR, thuyết minh điện tử.',
              'Kết nối với các di tích khác để phát triển du lịch lịch sử.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'cho-ben-thanh',
    slug: 'cho-ben-thanh',
    name: 'Chợ Bến Thành',
    label: 'NHỊP SỐNG THƯƠNG CẢNG',
    subtitle: 'Tháp đồng hồ và hơn một thế kỷ nhịp sống buôn bán của Sài Gòn',
    facts: [{ label: 'Khánh thành', value: '1914' }],
    imageAlt: 'Cổng chính Chợ Bến Thành với tháp đồng hồ',
    map: { x: 630, y: 570, labelSide: 'right' },
    sections: [
      {
        key: 'A',
        title: SECTION_TITLES.A,
        content: [
          {
            type: 'paragraph',
            text: 'Chợ có nguồn gốc từ các khu chợ xưa ở Sài Gòn. Công trình hiện nay được xây dựng vào đầu thế kỷ XX và khánh thành năm 1914.',
          },
        ],
      },
      {
        key: 'B',
        title: SECTION_TITLES.B,
        content: [
          {
            type: 'list',
            items: [
              'Nổi bật với cổng chính có tháp đồng hồ và kiến trúc mang dấu ấn lịch sử.',
              'Phản ánh quá trình phát triển thương mại của Sài Gòn.',
              'Thể hiện văn hóa buôn bán, ẩm thực và đời sống người dân Nam Bộ.',
              'Là địa điểm mua sắm, du lịch nổi tiếng.',
            ],
          },
        ],
      },
      {
        key: 'C',
        title: SECTION_TITLES.C,
        content: [
          {
            type: 'list',
            heading: 'Giải pháp bảo tồn',
            items: [
              'Giữ gìn kiến trúc đặc trưng khi tu sửa.',
              'Bảo đảm vệ sinh môi trường và phòng cháy chữa cháy.',
              'Duy trì nét buôn bán truyền thống, văn minh.',
            ],
          },
          {
            type: 'list',
            heading: 'Giải pháp phát huy',
            items: [
              'Quảng bá đặc sản, hàng thủ công và ẩm thực địa phương.',
              'Phát triển các chương trình tham quan, khám phá văn hóa chợ.',
              'Nâng cao chất lượng phục vụ và ý thức của tiểu thương.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'lang-ong-ba-chieu',
    slug: 'lang-ong-ba-chieu',
    name: 'Lăng Ông Bà Chiểu',
    label: 'NƠI GỬI GẮM TÍN NGƯỠNG',
    subtitle: 'Đền thờ Tả quân Lê Văn Duyệt – ký ức của vùng đất Gia Định',
    facts: [
      { label: 'Thờ phụng', value: 'Tả quân Lê Văn Duyệt' },
      { label: 'Ông mất năm', value: '1832' },
    ],
    imageAlt: 'Cổng tam quan Lăng Ông Bà Chiểu',
    map: { x: 680, y: 140, labelSide: 'right' },
    sections: [
      {
        key: 'A',
        title: SECTION_TITLES.A,
        content: [
          {
            type: 'paragraph',
            text: 'Đây là khu lăng mộ và đền thờ Tả quân Lê Văn Duyệt, danh tướng triều Nguyễn có nhiều đóng góp đối với vùng Gia Định. Sau khi ông qua đời năm 1832, nơi đây dần trở thành địa điểm thờ phụng và tưởng nhớ ông.',
          },
        ],
      },
      {
        key: 'B',
        title: SECTION_TITLES.B,
        content: [
          {
            type: 'list',
            items: [
              'Có khu mộ, miếu thờ, cổng tam quan và kiến trúc truyền thống.',
              'Gắn liền với lịch sử vùng Gia Định.',
              'Mang giá trị văn hóa, tín ngưỡng và thể hiện bản sắc Nam Bộ.',
            ],
          },
        ],
      },
      {
        key: 'C',
        title: SECTION_TITLES.C,
        content: [
          {
            type: 'list',
            heading: 'Giải pháp bảo tồn',
            items: [
              'Tu bổ công trình, bảo vệ bia đá và các chi tiết kiến trúc.',
              'Giữ gìn vệ sinh, cảnh quan và không gian thờ tự.',
              'Duy trì các nghi lễ truyền thống phù hợp.',
            ],
          },
          {
            type: 'list',
            heading: 'Giải pháp phát huy',
            items: [
              'Giới thiệu lịch sử Tả quân Lê Văn Duyệt và ý nghĩa khu lăng.',
              'Tổ chức hoạt động tham quan, tìm hiểu kiến trúc và tín ngưỡng.',
              'Quảng bá giá trị văn hóa qua tài liệu, video và lễ hội truyền thống.',
            ],
          },
        ],
      },
    ],
  },
];

export const TOTAL_LOCATIONS = LOCATIONS.length;

export const JOURNEY = {
  title: 'HÀNH TRÌNH KHÁM PHÁ',
  subtitle: 'Khám phá những câu chuyện và giá trị di sản của TP.HCM',
  project: 'Lịch sử, giá trị và giải pháp bảo tồn, phát huy di sản tại TP.HCM',
  generalSolutions: [
    {
      title: 'Bảo tồn',
      text: 'Thường xuyên kiểm tra, tu bổ đúng chuyên môn, lưu trữ tư liệu và nâng cao ý thức cộng đồng.',
    },
    {
      title: 'Phát huy',
      text: 'Đẩy mạnh giáo dục di sản trong trường học, quảng bá trên mạng xã hội và phát triển du lịch bền vững.',
    },
    {
      title: 'Ứng dụng công nghệ',
      text: 'Số hóa tư liệu, xây dựng bản đồ di sản và thuyết minh trực tuyến.',
    },
    {
      title: 'Huy động cộng đồng',
      text: 'Khuyến khích người dân, nhà trường và doanh nghiệp cùng tham gia gìn giữ di sản.',
    },
  ],
  conclusion:
    'Năm địa điểm trên đều mang những giá trị riêng về lịch sử, kiến trúc, giáo dục và văn hóa của TP. Hồ Chí Minh. Vì vậy, cần kết hợp bảo tồn với phát huy giá trị để di sản được gìn giữ lâu dài và tiếp tục đóng góp cho đời sống hiện đại.',
  message: 'Bảo tồn di sản là gìn giữ quá khứ, phát huy di sản là lan tỏa những giá trị tốt đẹp đến tương lai.',
};

export const getLocationIndex = (slug: string) => LOCATIONS.findIndex((location) => location.slug === slug);

export const formatOrder = (index: number) =>
  `${String(index + 1).padStart(2, '0')}/${String(TOTAL_LOCATIONS).padStart(2, '0')}`;
