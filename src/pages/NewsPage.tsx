
import React from "react";
import PageLayout from "../components/PageLayout";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../contexts/LanguageContext";

const NewsPage = () => {
  const { language } = useLanguage();
  
  // Example news data (expanded from the home page)
  const newsItems = [
    {
      id: 1,
      title: language === "fr" 
        ? "Journée portes ouvertes le 15 mai" 
        : language === "ar" 
          ? "يوم الأبواب المفتوحة في 15 مايو" 
          : "Open Day on May 15",
      excerpt: language === "fr" 
        ? "Venez découvrir notre école et rencontrer nos enseignants lors de notre journée portes ouvertes."
        : language === "ar"
          ? "تعال واكتشف مدرستنا والتقِ بمدرسينا خلال يوم الأبواب المفتوحة."
          : "Come discover our school and meet our teachers during our open day.",
      content: language === "fr"
        ? "Nous sommes ravis d'annoncer notre Journée Portes Ouvertes annuelle qui aura lieu le samedi 15 mai de 9h à 16h. Cette journée est l'occasion idéale pour les familles intéressées de visiter notre campus, de rencontrer nos enseignants et notre personnel, et d'en apprendre davantage sur nos programmes éducatifs. Des activités seront organisées tout au long de la journée pour les enfants, et nos élèves actuels présenteront des projets et des performances. Nous espérons vous y voir nombreux!"
        : language === "ar"
          ? "يسرنا أن نعلن عن يوم الأبواب المفتوحة السنوي الذي سيقام يوم السبت 15 مايو من الساعة 9 صباحًا حتى 4 مساءً. هذا اليوم هو فرصة مثالية للعائلات المهتمة لزيارة حرمنا الجامعي، ولقاء معلمينا وموظفينا، ومعرفة المزيد عن برامجنا التعليمية. سيتم تنظيم أنشطة على مدار اليوم للأطفال، وسيقدم طلابنا الحاليون مشاريع وعروضًا. نأمل أن نراكم جميعًا هناك!"
          : "We are delighted to announce our annual Open Day which will take place on Saturday, May 15 from 9am to 4pm. This day is the perfect opportunity for interested families to visit our campus, meet our teachers and staff, and learn more about our educational programs. Activities will be organized throughout the day for children, and our current students will present projects and performances. We hope to see many of you there!",
      date: "2025-05-15",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: language === "fr" 
        ? "Résultats exceptionnels aux examens nationaux" 
        : language === "ar" 
          ? "نتائج استثنائية في الامتحانات الوطنية" 
          : "Exceptional results in national exams",
      excerpt: language === "fr" 
        ? "Nos élèves ont obtenu d'excellents résultats aux examens nationaux cette année."
        : language === "ar"
          ? "حصل طلابنا على نتائج ممتازة في الامتحانات الوطنية هذا العام."
          : "Our students achieved excellent results in national exams this year.",
      content: language === "fr"
        ? "Nous sommes fiers d'annoncer que nos élèves ont obtenu des résultats exceptionnels aux examens nationaux cette année. Avec un taux de réussite de 98% et plus de 75% de nos élèves obtenant des mentions « Bien » ou « Très bien », ces résultats témoignent de l'excellence académique de notre établissement. Félicitations à tous nos élèves pour leur travail acharné et leur persévérance, ainsi qu'à nos enseignants dévoués pour leur soutien constant. Ces résultats remarquables ouvrent de belles perspectives universitaires à nos diplômés."
        : language === "ar"
          ? "نحن فخورون بالإعلان عن حصول طلابنا على نتائج استثنائية في الامتحانات الوطنية هذا العام. بمعدل نجاح 98٪ وأكثر من 75٪ من طلابنا يحصلون على تقديرات 'جيد' أو 'جيد جدًا'، تشهد هذه النتائج على التميز الأكاديمي لمؤسستنا. تهانينا لجميع طلابنا على عملهم الجاد ومثابرتهم، وكذلك لمعلمينا المتفانين على دعمهم المستمر. تفتح هذه النتائج الرائعة آفاقًا جامعية رائعة لخريجينا."
          : "We are proud to announce that our students have achieved exceptional results in national exams this year. With a pass rate of 98% and more than 75% of our students earning 'Good' or 'Very Good' honors, these results testify to the academic excellence of our institution. Congratulations to all our students for their hard work and perseverance, as well as to our dedicated teachers for their constant support. These remarkable results open up great university prospects for our graduates.",
      date: "2025-04-10",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: language === "fr" 
        ? "Nouveau partenariat avec l'OCP" 
        : language === "ar" 
          ? "شراكة جديدة مع مجموعة OCP" 
          : "New partnership with OCP Group",
      excerpt: language === "fr" 
        ? "Nous sommes fiers d'annoncer notre nouveau partenariat avec l'OCP Group."
        : language === "ar"
          ? "نحن فخورون بالإعلان عن شراكتنا الجديدة مع مجموعة OCP."
          : "We are proud to announce our new partnership with OCP Group.",
      content: language === "fr"
        ? "Nous sommes ravis d'annoncer la signature d'un partenariat stratégique avec le Groupe OCP. Cette collaboration permettra à nos élèves de bénéficier de ressources éducatives supplémentaires, notamment dans les domaines des sciences et de la technologie. Le partenariat comprend des programmes de mentorat, des visites d'installations industrielles, des ateliers animés par des professionnels de l'OCP, ainsi que des bourses d'études pour les élèves méritants. Nous sommes convaincus que ce partenariat enrichira considérablement l'expérience éducative de nos élèves et les préparera mieux aux carrières de demain."
        : language === "ar"
          ? "يسرنا أن نعلن عن توقيع شراكة استراتيجية مع مجموعة OCP. سيتيح هذا التعاون لطلابنا الاستفادة من موارد تعليمية إضافية، خاصة في مجالات العلوم والتكنولوجيا. تتضمن الشراكة برامج التوجيه، وزيارات للمنشآت الصناعية، وورش عمل يقدمها محترفو OCP، بالإضافة إلى المنح الدراسية للطلاب المستحقين. نحن على ثقة من أن هذه الشراكة ستثري بشكل كبير التجربة التعليمية لطلابنا وتعدهم بشكل أفضل لوظائف المستقبل."
          : "We are delighted to announce the signing of a strategic partnership with OCP Group. This collaboration will enable our students to benefit from additional educational resources, particularly in the fields of science and technology. The partnership includes mentoring programs, visits to industrial facilities, workshops led by OCP professionals, as well as scholarships for deserving students. We are confident that this partnership will significantly enrich the educational experience of our students and better prepare them for the careers of tomorrow.",
      date: "2025-03-22",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: language === "fr" 
        ? "Succès du tournoi sportif inter-écoles" 
        : language === "ar" 
          ? "نجاح البطولة الرياضية بين المدارس" 
          : "Success of the inter-school sports tournament",
      excerpt: language === "fr" 
        ? "Nos équipes sportives ont brillé lors du tournoi régional inter-écoles."
        : language === "ar"
          ? "تألقت فرقنا الرياضية خلال البطولة الإقليمية بين المدارس."
          : "Our sports teams shone during the regional inter-school tournament.",
      content: language === "fr"
        ? "Le week-end dernier, nos équipes sportives ont participé au tournoi régional inter-écoles et ont obtenu d'excellents résultats. Notre équipe de football a remporté la première place, tandis que nos équipes de basketball et de volleyball se sont classées respectivement deuxième et troisième. Ces succès témoignent non seulement des talents athlétiques de nos élèves, mais aussi de leur esprit d'équipe, de leur détermination et de leur fair-play. Félicitations à tous les participants et un grand merci à nos entraîneurs dévoués pour leur excellent travail."
        : language === "ar"
          ? "شاركت فرقنا الرياضية في البطولة الإقليمية بين المدارس نهاية الأسبوع الماضي وحققت نتائج ممتازة. فاز فريق كرة القدم لدينا بالمركز الأول، بينما احتل فريقا كرة السلة والكرة الطائرة المركزين الثاني والثالث على التوالي. تشهد هذه النجاحات ليس فقط على المواهب الرياضية لطلابنا، ولكن أيضًا على روح الفريق والتصميم واللعب النظيف. تهانينا لجميع المشاركين وشكرًا جزيلاً لمدربينا المتفانين على عملهم الممتاز."
          : "Last weekend, our sports teams participated in the regional inter-school tournament and achieved excellent results. Our football team won first place, while our basketball and volleyball teams placed second and third respectively. These successes testify not only to the athletic talents of our students, but also to their team spirit, determination, and fair play. Congratulations to all participants and a big thank you to our dedicated coaches for their excellent work.",
      date: "2025-02-15",
      image: "https://images.unsplash.com/photo-1518329123662-2c7369345058?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === "fr") {
      return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } else if (language === "ar") {
      return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } else {
      return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    }
  };

  return (
    <PageLayout>
      <PageHeader 
        title={language === "fr" ? "Actualités" : language === "ar" ? "الأخبار" : "News"}
        subtitle={language === "fr" 
          ? "Restez informé des dernières nouvelles et événements de notre école" 
          : language === "ar" 
            ? "ابق على اطلاع بآخر أخبار وفعاليات مدرستنا" 
            : "Stay informed about the latest news and events from our school"
        }
      />
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - news list */}
          <div className="lg:col-span-2">
            {newsItems.map((item) => (
              <div key={item.id} className="mb-12">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="object-cover w-full h-64 rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-2">{formatDate(item.date)}</p>
                <h2 className="text-2xl font-bold mb-4 text-elbilia-blue">{item.title}</h2>
                <div className="prose max-w-none text-gray-700 mb-4">
                  <p>{item.content}</p>
                </div>
                <div className="border-b border-gray-200 pb-8"></div>
              </div>
            ))}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-elbilia-blue">
                {language === "fr" ? "Événements à venir" : language === "ar" ? "الأحداث القادمة" : "Upcoming Events"}
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-500 mb-1">15 Mai 2025</p>
                  <h4 className="font-semibold">
                    {language === "fr" ? "Journée portes ouvertes" : language === "ar" ? "يوم الأبواب المفتوحة" : "Open Day"}
                  </h4>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-500 mb-1">2 Juin 2025</p>
                  <h4 className="font-semibold">
                    {language === "fr" ? "Cérémonie de remise des diplômes" : language === "ar" ? "حفل التخرج" : "Graduation Ceremony"}
                  </h4>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-500 mb-1">10 Juin 2025</p>
                  <h4 className="font-semibold">
                    {language === "fr" ? "Exposition d'art des élèves" : language === "ar" ? "معرض فني للطلاب" : "Student Art Exhibition"}
                  </h4>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">15 Juin 2025</p>
                  <h4 className="font-semibold">
                    {language === "fr" ? "Début des vacances d'été" : language === "ar" ? "بداية عطلة الصيف" : "Start of Summer Break"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NewsPage;
