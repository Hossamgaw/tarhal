// ============================================
// TARHAL — Countries + Cities Database
// Comprehensive offline database
// ============================================

const COUNTRIES_DB = [
  // ============== MIDDLE EAST ==============
  { code:'EG', ar:'مصر', en:'Egypt', currency:'EGP', flag:'🇪🇬', cities:[
    'القاهرة','الإسكندرية','الجيزة','شرم الشيخ','الغردقة','الأقصر','أسوان','بورسعيد','السويس','المنصورة','طنطا','أسيوط','سوهاج','قنا','دمياط','كفر الشيخ','بني سويف','الفيوم','المنيا','مرسى مطروح','العريش','رأس غارب','دهب','نويبع','سفاجا'
  ]},
  { code:'SA', ar:'السعودية', en:'Saudi Arabia', currency:'SAR', flag:'🇸🇦', cities:[
    'الرياض','جدة','مكة المكرمة','المدينة المنورة','الدمام','الخبر','الطائف','أبها','تبوك','بريدة','خميس مشيط','حائل','نجران','جيزان','الجبيل','ينبع','الأحساء','القطيف','عرعر','سكاكا'
  ]},
  { code:'AE', ar:'الإمارات', en:'United Arab Emirates', currency:'AED', flag:'🇦🇪', cities:[
    'دبي','أبو ظبي','الشارقة','عجمان','رأس الخيمة','الفجيرة','أم القيوين','خورفكان','دبا الفجيرة','العين','مدينة زايد','الرويس'
  ]},
  { code:'KW', ar:'الكويت', en:'Kuwait', currency:'KWD', flag:'🇰🇼', cities:[
    'مدينة الكويت','حولي','السالمية','الفروانية','الجهراء','الأحمدي','الفنطاس','المهبولة','الفحيحيل','صباح السالم'
  ]},
  { code:'QA', ar:'قطر', en:'Qatar', currency:'QAR', flag:'🇶🇦', cities:[
    'الدوحة','الريان','الوكرة','الخور','أم صلال','الشحانية','دخان','مسيعيد','لوسيل'
  ]},
  { code:'BH', ar:'البحرين', en:'Bahrain', currency:'BHD', flag:'🇧🇭', cities:[
    'المنامة','المحرق','الرفاع','مدينة حمد','مدينة عيسى','سترة','البديع','الجفير'
  ]},
  { code:'OM', ar:'عُمان', en:'Oman', currency:'OMR', flag:'🇴🇲', cities:[
    'مسقط','صلالة','صحار','نزوى','صور','البريمي','إبراء','الرستاق','بركاء','مطرح'
  ]},
  { code:'JO', ar:'الأردن', en:'Jordan', currency:'JOD', flag:'🇯🇴', cities:[
    'عمّان','إربد','الزرقاء','العقبة','السلط','مادبا','جرش','الكرك','معان','عجلون','وادي رم','البتراء'
  ]},
  { code:'LB', ar:'لبنان', en:'Lebanon', currency:'LBP', flag:'🇱🇧', cities:[
    'بيروت','طرابلس','صيدا','صور','جونية','زحلة','بعلبك','النبطية','جبيل','عاليه'
  ]},
  { code:'SY', ar:'سوريا', en:'Syria', currency:'SYP', flag:'🇸🇾', cities:[
    'دمشق','حلب','حمص','حماة','اللاذقية','طرطوس','دير الزور','الرقة','الحسكة','درعا','السويداء','القامشلي','إدلب'
  ]},
  { code:'IQ', ar:'العراق', en:'Iraq', currency:'IQD', flag:'🇮🇶', cities:[
    'بغداد','البصرة','أربيل','الموصل','النجف','كربلاء','السليمانية','كركوك','الناصرية','الديوانية','دهوك','الرمادي','الحلة'
  ]},
  { code:'PS', ar:'فلسطين', en:'Palestine', currency:'ILS', flag:'🇵🇸', cities:[
    'القدس','غزة','رام الله','بيت لحم','نابلس','الخليل','جنين','طولكرم','قلقيلية','أريحا','رفح','خان يونس','بيت جالا','بيت ساحور'
  ]},
  { code:'YE', ar:'اليمن', en:'Yemen', currency:'YER', flag:'🇾🇪', cities:[
    'صنعاء','عدن','تعز','الحديدة','المكلا','إب','ذمار','سيئون','حجة','عمران','مأرب'
  ]},
  { code:'SD', ar:'السودان', en:'Sudan', currency:'SDG', flag:'🇸🇩', cities:[
    'الخرطوم','أم درمان','بورتسودان','كسلا','الأبيض','عطبرة','ود مدني','نيالا','الفاشر','دنقلا'
  ]},
  { code:'LY', ar:'ليبيا', en:'Libya', currency:'LYD', flag:'🇱🇾', cities:[
    'طرابلس','بنغازي','مصراتة','الزاوية','سبها','درنة','طبرق','الخمس','صبراتة','غريان','أجدابيا'
  ]},

  // ============== NORTH AFRICA ==============
  { code:'TN', ar:'تونس', en:'Tunisia', currency:'TND', flag:'🇹🇳', cities:[
    'تونس','صفاقس','سوسة','القيروان','بنزرت','قابس','المنستير','نابل','المهدية','حمامات','جربة','توزر','باجة','القصرين'
  ]},
  { code:'DZ', ar:'الجزائر', en:'Algeria', currency:'DZD', flag:'🇩🇿', cities:[
    'الجزائر','وهران','قسنطينة','عنابة','باتنة','سطيف','بجاية','تلمسان','البليدة','ورقلة','تيزي وزو','غرداية','مستغانم'
  ]},
  { code:'MA', ar:'المغرب', en:'Morocco', currency:'MAD', flag:'🇲🇦', cities:[
    'الدار البيضاء','الرباط','مراكش','فاس','طنجة','أكادير','مكناس','وجدة','تطوان','القنيطرة','الصويرة','ورزازات','العرائش','الحسيمة','شفشاون','الرشيدية','بني ملال','خريبكة'
  ]},

  // ============== TURKEY & MIDDLE ==============
  { code:'TR', ar:'تركيا', en:'Turkey', currency:'TRY', flag:'🇹🇷', cities:[
    'إستانبول','أنقرة','إزمير','أنطاليا','بورصة','أضنة','قونية','غازي عنتاب','طرابزون','قيسارية','مرسين','ديار بكر','بودروم','مرمريس','آلانيا','أورفة','أرضروم','دنيزلي','سامسون','إسكي شهير','نوشهر','كوش أداسي','فتحية','أولو دنيز'
  ]},
  { code:'IR', ar:'إيران', en:'Iran', currency:'IRR', flag:'🇮🇷', cities:[
    'طهران','مشهد','أصفهان','شيراز','تبريز','قم','أهواز','كرج','كرمان','يزد','رشت','أورمية'
  ]},

  // ============== ASIA ==============
  { code:'MY', ar:'ماليزيا', en:'Malaysia', currency:'MYR', flag:'🇲🇾', cities:[
    'كوالالمبور','جورج تاون','جوهور باهرو','إيبوه','شاه عالم','كوتا كينابالو','كوتشينغ','ملاكا','بينانغ','لانكاوي','بتروناس','بوتراجايا'
  ]},
  { code:'ID', ar:'إندونيسيا', en:'Indonesia', currency:'IDR', flag:'🇮🇩', cities:[
    'جاكرتا','بالي','سورابايا','باندونغ','ميدان','سيمارانغ','ماكاسار','يوغياكارتا','باليمبانغ','دنباسار','لومبوك','بونشاك'
  ]},
  { code:'MV', ar:'المالديف', en:'Maldives', currency:'MVR', flag:'🇲🇻', cities:[
    'ماليه','جزيرة مافوشي','هولهومالي','أدّو','فونادو','كوراماثي'
  ]},
  { code:'TH', ar:'تايلاند', en:'Thailand', currency:'THB', flag:'🇹🇭', cities:[
    'بانكوك','شيانغ ماي','فوكيت','باتايا','كوه ساموي','كرابي','هوا هين','بوكيت','أيوتايا','خون كاين','بتايا'
  ]},
  { code:'SG', ar:'سنغافورة', en:'Singapore', currency:'SGD', flag:'🇸🇬', cities:['سنغافورة'] },
  { code:'JP', ar:'اليابان', en:'Japan', currency:'JPY', flag:'🇯🇵', cities:[
    'طوكيو','أوساكا','كيوتو','يوكوهاما','ناغويا','سابورو','هيروشيما','فوكوكا','كوبي','نارا','أوكيناوا'
  ]},
  { code:'CN', ar:'الصين', en:'China', currency:'CNY', flag:'🇨🇳', cities:[
    'بكين','شنغهاي','غوانزو','شنتشن','تشينغدو','هانغتشو','شيان','نانجينغ','ووهان','تيانجين','هونغ كونغ','ماكاو'
  ]},
  { code:'KR', ar:'كوريا الجنوبية', en:'South Korea', currency:'KRW', flag:'🇰🇷', cities:[
    'سيول','بوسان','إنتشون','دايغو','دايجون','جيجو','سوون','أولسان'
  ]},
  { code:'IN', ar:'الهند', en:'India', currency:'INR', flag:'🇮🇳', cities:[
    'نيودلهي','مومباي','بنغالور','حيدر أباد','تشيناي','كولكاتا','أحمد أباد','جيبور','أغرا','لكناو','بونا','كوتشي','غوا','فاراناسي'
  ]},
  { code:'PK', ar:'باكستان', en:'Pakistan', currency:'PKR', flag:'🇵🇰', cities:[
    'إسلام آباد','كراتشي','لاهور','فيصل آباد','راولبندي','بيشاور','كويتا','ملتان','حيدر آباد','سيالكوت'
  ]},
  { code:'BD', ar:'بنغلاديش', en:'Bangladesh', currency:'BDT', flag:'🇧🇩', cities:[
    'دكا','شيتاغونغ','خولنا','راجشاهي','سلهت','باريسال'
  ]},
  { code:'PH', ar:'الفلبين', en:'Philippines', currency:'PHP', flag:'🇵🇭', cities:[
    'مانيلا','سيبو','دافاو','كيزون','ماكاتي','بوراكاي','بالاوان'
  ]},
  { code:'VN', ar:'فيتنام', en:'Vietnam', currency:'VND', flag:'🇻🇳', cities:[
    'هانوي','هو تشي منه','دا نانغ','هوي أن','نها ترانغ','فان ثيت','سابا'
  ]},
  { code:'KH', ar:'كمبوديا', en:'Cambodia', currency:'KHR', flag:'🇰🇭', cities:[
    'بنوم بنه','سييم ريب','سيهانوكفيل'
  ]},
  { code:'LK', ar:'سريلانكا', en:'Sri Lanka', currency:'LKR', flag:'🇱🇰', cities:[
    'كولومبو','كاندي','غالي','نيغومبو','أنورادهابورا'
  ]},
  { code:'NP', ar:'نيبال', en:'Nepal', currency:'NPR', flag:'🇳🇵', cities:[
    'كاتماندو','بوكهارا','لاليت بور','بهاكتابور'
  ]},
  { code:'KZ', ar:'كازاخستان', en:'Kazakhstan', currency:'KZT', flag:'🇰🇿', cities:[
    'ألماتي','نور سلطان','شيمكنت','أكتوبي','أتيراو'
  ]},
  { code:'UZ', ar:'أوزبكستان', en:'Uzbekistan', currency:'UZS', flag:'🇺🇿', cities:[
    'طشقند','سمرقند','بخارى','خيوة','نمغان'
  ]},

  // ============== EUROPE ==============
  { code:'GB', ar:'بريطانيا', en:'United Kingdom', currency:'GBP', flag:'🇬🇧', cities:[
    'لندن','مانشستر','برمنغهام','ليفربول','إدنبرة','غلاسكو','بريستول','ليدز','شفيلد','نيوكاسل','نوتنغهام','كارديف','بلفاست','أوكسفورد','كامبريدج','برايتون','يورك','باث'
  ]},
  { code:'FR', ar:'فرنسا', en:'France', currency:'EUR', flag:'🇫🇷', cities:[
    'باريس','مارسيليا','ليون','تولوز','نيس','نانت','ستراسبورغ','مونبلييه','بوردو','ليل','رين','كان','كان','أفينيون','نيم','تولون'
  ]},
  { code:'DE', ar:'ألمانيا', en:'Germany', currency:'EUR', flag:'🇩🇪', cities:[
    'برلين','ميونخ','هامبورغ','فرانكفورت','كولونيا','شتوتغارت','دوسلدورف','دورتموند','إيسن','لايبزيغ','بريمن','درسدن','هانوفر','نورمبرغ','هايدلبرغ'
  ]},
  { code:'IT', ar:'إيطاليا', en:'Italy', currency:'EUR', flag:'🇮🇹', cities:[
    'روما','ميلانو','نابولي','تورينو','باليرمو','جنوة','بولونيا','فلورنسا','باري','كاتانيا','فينيسيا','فيرونا','بيزا','سينا','أمالفي','كابري','ريميني','ريفييرا'
  ]},
  { code:'ES', ar:'إسبانيا', en:'Spain', currency:'EUR', flag:'🇪🇸', cities:[
    'مدريد','برشلونة','فالنسيا','إشبيلية','سرقسطة','ملقة','مرسية','بالما','لاس بالماس','بلباو','أليكانتي','غرناطة','قرطبة','توليدو','سان سيباستيان','إيبيزا','مايوركا'
  ]},
  { code:'PT', ar:'البرتغال', en:'Portugal', currency:'EUR', flag:'🇵🇹', cities:[
    'لشبونة','بورتو','براغا','كويمبرا','فارو','فونشال','سنتارا','أفيرو','إيفورا'
  ]},
  { code:'NL', ar:'هولندا', en:'Netherlands', currency:'EUR', flag:'🇳🇱', cities:[
    'أمستردام','روتردام','لاهاي','أوترخت','آيندهوفن','خرونينغن','ماستريخت','هارلم'
  ]},
  { code:'BE', ar:'بلجيكا', en:'Belgium', currency:'EUR', flag:'🇧🇪', cities:[
    'بروكسل','أنتويرب','غنت','شارلروا','بروج','لييج','لوفين'
  ]},
  { code:'CH', ar:'سويسرا', en:'Switzerland', currency:'CHF', flag:'🇨🇭', cities:[
    'زيورخ','جنيف','بازل','برن','لوزان','لوسرن','إنترلاكن','لوغانو','زيرمات','سانت موريتز','دافوس'
  ]},
  { code:'AT', ar:'النمسا', en:'Austria', currency:'EUR', flag:'🇦🇹', cities:[
    'فيينا','سالزبورغ','غراتس','لينتس','إنسبروك','كلاغنفورت','هالشتات'
  ]},
  { code:'GR', ar:'اليونان', en:'Greece', currency:'EUR', flag:'🇬🇷', cities:[
    'أثينا','سالونيك','سانتوريني','ميكانوس','كريت','رودس','كورفو','باتراس','أوليمبيا','دلفي'
  ]},
  { code:'SE', ar:'السويد', en:'Sweden', currency:'SEK', flag:'🇸🇪', cities:[
    'ستوكهولم','غوتنبرغ','مالمو','أوبسالا','كيرونا'
  ]},
  { code:'NO', ar:'النرويج', en:'Norway', currency:'NOK', flag:'🇳🇴', cities:[
    'أوسلو','برغن','تروندهايم','ستافنغر','ترومسو'
  ]},
  { code:'DK', ar:'الدنمارك', en:'Denmark', currency:'DKK', flag:'🇩🇰', cities:[
    'كوبنهاغن','آرهوس','أودنسه','ألبورغ'
  ]},
  { code:'FI', ar:'فنلندا', en:'Finland', currency:'EUR', flag:'🇫🇮', cities:[
    'هلسنكي','إسبو','تامبيري','توركو','روفانييمي'
  ]},
  { code:'IE', ar:'أيرلندا', en:'Ireland', currency:'EUR', flag:'🇮🇪', cities:[
    'دبلن','كورك','غالواي','ليمريك'
  ]},
  { code:'IS', ar:'أيسلندا', en:'Iceland', currency:'ISK', flag:'🇮🇸', cities:[
    'ريكيافيك','أكوريري'
  ]},
  { code:'PL', ar:'بولندا', en:'Poland', currency:'PLN', flag:'🇵🇱', cities:[
    'وارسو','كراكوف','غدانسك','فروتسواف','بوزنان','لودز'
  ]},
  { code:'CZ', ar:'التشيك', en:'Czech Republic', currency:'CZK', flag:'🇨🇿', cities:[
    'براغ','برنو','أوسترافا','كارلوفي فاري'
  ]},
  { code:'HU', ar:'المجر', en:'Hungary', currency:'HUF', flag:'🇭🇺', cities:[
    'بودابست','دبرتسن','سيغد','بيتش'
  ]},
  { code:'RO', ar:'رومانيا', en:'Romania', currency:'RON', flag:'🇷🇴', cities:[
    'بوخارست','كلوج','براشوف','كونستانتا','ياشي'
  ]},
  { code:'BG', ar:'بلغاريا', en:'Bulgaria', currency:'BGN', flag:'🇧🇬', cities:[
    'صوفيا','فارنا','بلوفديف','بورغاس','غولدن ساندز'
  ]},
  { code:'RU', ar:'روسيا', en:'Russia', currency:'RUB', flag:'🇷🇺', cities:[
    'موسكو','سانت بطرسبرغ','سوتشي','قازان','نوفوسيبيرسك','يكاترينبورغ','فلاديفوستوك'
  ]},
  { code:'UA', ar:'أوكرانيا', en:'Ukraine', currency:'UAH', flag:'🇺🇦', cities:[
    'كييف','خاركيف','أوديسا','لفيف','دنيبرو'
  ]},
  { code:'AZ', ar:'أذربيجان', en:'Azerbaijan', currency:'AZN', flag:'🇦🇿', cities:[
    'باكو','غنجه','سومغايت'
  ]},
  { code:'GE', ar:'جورجيا', en:'Georgia', currency:'GEL', flag:'🇬🇪', cities:[
    'تبليسي','باتومي','كوتايسي','بورجومي','مستيا'
  ]},
  { code:'AM', ar:'أرمينيا', en:'Armenia', currency:'AMD', flag:'🇦🇲', cities:[
    'يريفان','غيومري'
  ]},
  { code:'CY', ar:'قبرص', en:'Cyprus', currency:'EUR', flag:'🇨🇾', cities:[
    'نيقوسيا','ليماسول','لارنكا','بافوس','أيا نابا'
  ]},
  { code:'MT', ar:'مالطا', en:'Malta', currency:'EUR', flag:'🇲🇹', cities:[
    'فاليتا','سانت جوليان','سليمة'
  ]},

  // ============== AMERICAS ==============
  { code:'US', ar:'الولايات المتحدة', en:'United States', currency:'USD', flag:'🇺🇸', cities:[
    'نيويورك','لوس أنجلوس','شيكاغو','هيوستن','ميامي','سان فرانسيسكو','واشنطن','بوسطن','سياتل','لاس فيغاس','أورلاندو','فيلادلفيا','دالاس','أتلانتا','دنفر','فينيكس','سان دييغو','هونولولو','ناشفيل','نيوأورلينز'
  ]},
  { code:'CA', ar:'كندا', en:'Canada', currency:'CAD', flag:'🇨🇦', cities:[
    'تورونتو','فانكوفر','مونتريال','كالغاري','أوتاوا','إدمونتون','كيبيك','وينيبيغ','هاليفاكس','فيكتوريا','بانف'
  ]},
  { code:'MX', ar:'المكسيك', en:'Mexico', currency:'MXN', flag:'🇲🇽', cities:[
    'مكسيكو سيتي','غوادالاخارا','مونتيري','كانكون','تيخوانا','بويبلا','لويس بوتوسي','أواكساكا','كابو سان لوكاس','بلايا ديل كارمن'
  ]},
  { code:'BR', ar:'البرازيل', en:'Brazil', currency:'BRL', flag:'🇧🇷', cities:[
    'ساو باولو','ريو دي جانيرو','برازيليا','سالفادور','فورتاليزا','بيلو هوريزونتي','ماناوس','بورتو أليغري','ريسيفي','فلوريانوبوليس'
  ]},
  { code:'AR', ar:'الأرجنتين', en:'Argentina', currency:'ARS', flag:'🇦🇷', cities:[
    'بوينس آيرس','كوردوبا','روزاريو','ميندوزا','باريلوتشي','أوشوايا'
  ]},
  { code:'CL', ar:'تشيلي', en:'Chile', currency:'CLP', flag:'🇨🇱', cities:[
    'سانتياغو','فالبارايسو','فينيا ديل مار','أنتوفاغاستا','بونتا أريناس'
  ]},
  { code:'PE', ar:'بيرو', en:'Peru', currency:'PEN', flag:'🇵🇪', cities:[
    'ليما','كوسكو','أريكويبا','تروخيو','إكيتوس','ماتشو بيتشو'
  ]},
  { code:'CO', ar:'كولومبيا', en:'Colombia', currency:'COP', flag:'🇨🇴', cities:[
    'بوغوتا','ميديلين','كالي','كارتاخينا','بارانكيا'
  ]},
  { code:'CU', ar:'كوبا', en:'Cuba', currency:'CUP', flag:'🇨🇺', cities:[
    'هافانا','فاراديرو','سانتياغو دي كوبا','ترينيداد'
  ]},
  { code:'DO', ar:'الدومينيكان', en:'Dominican Republic', currency:'DOP', flag:'🇩🇴', cities:[
    'سانتو دومينغو','بونتا كانا','بويرتو بلاتا'
  ]},

  // ============== AFRICA ==============
  { code:'ZA', ar:'جنوب أفريقيا', en:'South Africa', currency:'ZAR', flag:'🇿🇦', cities:[
    'كيب تاون','جوهانسبرغ','ديربان','بريتوريا','بورت إليزابيث','ستيلينبوش','صن سيتي'
  ]},
  { code:'KE', ar:'كينيا', en:'Kenya', currency:'KES', flag:'🇰🇪', cities:[
    'نيروبي','مومباسا','كيسومو','ناكورو','إلدوريت','ماليندي'
  ]},
  { code:'ET', ar:'إثيوبيا', en:'Ethiopia', currency:'ETB', flag:'🇪🇹', cities:[
    'أديس أبابا','دير داوا','مقلي','بحر دار','غوندر','أكسوم','لاليبيلا'
  ]},
  { code:'NG', ar:'نيجيريا', en:'Nigeria', currency:'NGN', flag:'🇳🇬', cities:[
    'لاغوس','أبوجا','كانو','إيبادان','بورت هاركورت','بنين'
  ]},
  { code:'TZ', ar:'تنزانيا', en:'Tanzania', currency:'TZS', flag:'🇹🇿', cities:[
    'دار السلام','زنجبار','أروشا','دودوما','موانزا','سيرينغيتي','كليمنجارو'
  ]},
  { code:'GH', ar:'غانا', en:'Ghana', currency:'GHS', flag:'🇬🇭', cities:[
    'أكرا','كوماسي','تامالي','كيب كوست'
  ]},
  { code:'SN', ar:'السنغال', en:'Senegal', currency:'XOF', flag:'🇸🇳', cities:[
    'داكار','سانت لويس','توبا'
  ]},
  { code:'CM', ar:'الكاميرون', en:'Cameroon', currency:'XAF', flag:'🇨🇲', cities:[
    'ياوندي','دوالا'
  ]},
  { code:'CI', ar:'ساحل العاج', en:'Ivory Coast', currency:'XOF', flag:'🇨🇮', cities:[
    'أبيدجان','ياموسوكرو'
  ]},
  { code:'UG', ar:'أوغندا', en:'Uganda', currency:'UGX', flag:'🇺🇬', cities:[
    'كمبالا','إنتيبي'
  ]},

  // ============== OCEANIA ==============
  { code:'AU', ar:'أستراليا', en:'Australia', currency:'AUD', flag:'🇦🇺', cities:[
    'سيدني','ملبورن','بريزبان','بيرث','أديلايد','كانبرا','جولد كوست','هوبارت','داروين','كيرنز','أولورو'
  ]},
  { code:'NZ', ar:'نيوزيلندا', en:'New Zealand', currency:'NZD', flag:'🇳🇿', cities:[
    'أوكلاند','ويلينغتون','كرايستشيرش','كوينزتاون','دنيدن','روتوروا'
  ]},
  { code:'FJ', ar:'فيجي', en:'Fiji', currency:'FJD', flag:'🇫🇯', cities:[
    'سوفا','نادي','ديناراو'
  ]},

  // ============== ISLANDS ==============
  { code:'MU', ar:'موريشيوس', en:'Mauritius', currency:'MUR', flag:'🇲🇺', cities:[
    'بورت لويس','غراند باي','فليك إن فلاك'
  ]},
  { code:'SC', ar:'سيشل', en:'Seychelles', currency:'SCR', flag:'🇸🇨', cities:[
    'فيكتوريا'
  ]},
  { code:'MG', ar:'مدغشقر', en:'Madagascar', currency:'MGA', flag:'🇲🇬', cities:[
    'أنتاناناريفو','نوسي بي'
  ]},
];

// ============================================
// HELPERS
// ============================================

function countryCodeToFlag(code) {
  if (!code || code.length !== 2) return '🌍';
  try {
    const codePoints = code.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch (e) { return '🌍'; }
}

async function loadCountries() {
  return COUNTRIES_DB;
}

function getAllCountries() {
  return COUNTRIES_DB;
}

function getCountryByCode(code) {
  return COUNTRIES_DB.find(c => c.code === code) || null;
}

function getCountryName(code, locale) {
  const c = getCountryByCode(code);
  if (!c) return code;
  const loc = locale || (typeof getLocale === 'function' ? getLocale() : 'ar');
  return loc === 'ar' ? c.ar : c.en;
}

function getCurrencyByCountry(code) {
  const c = getCountryByCode(code);
  return c ? c.currency : 'USD';
}

/**
 * Main search: countries + cities
 */
async function searchAll(query) {
  const q = query.trim();
  if (!q || q.length < 1) return [];

  const qLower = q.toLowerCase();
  const isAr = (typeof isRTL === 'function') ? isRTL() : true;
  const results = [];

  for (const country of COUNTRIES_DB) {
    // Country match
    if (country.ar.includes(q) || country.en.toLowerCase().includes(qLower)) {
      results.push({
        type: 'country',
        code: country.code,
        flag: country.flag,
        name: isAr ? country.ar : country.en,
        sub: isAr ? country.en : country.ar,
        displayName: `${country.flag} ${isAr ? country.ar : country.en}`,
      });
    }

    // City matches
    for (const city of country.cities) {
      const cityLower = city.toLowerCase();
      if (city.includes(q) || cityLower.includes(qLower)) {
        results.push({
          type: 'city',
          countryCode: country.code,
          flag: country.flag,
          name: city,
          sub: isAr ? country.ar : country.en,
          displayName: `${country.flag} ${city} — ${isAr ? country.ar : country.en}`,
        });
      }
    }
  }

  // If English city search, also search English city names — but we only have Arabic cities list, so skip.
  return results.slice(0, 30);
}

/**
 * Detect user's country via IP
 */
async function detectUserCountry() {
  try {
    const cached = localStorage.getItem('tarhal_user_country');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.expiry > Date.now()) return parsed.data;
    }
  } catch (e) { /* ignore */ }

  const fallback = { country: 'EG', currency: 'EGP' };

  try {
    const res = await fetch('https://ipwho.is/');
    const data = await res.json();
    if (data && data.success && data.country_code) {
      const result = {
        country: data.country_code,
        currency: getCurrencyByCountry(data.country_code) || 'USD',
      };
      try {
        localStorage.setItem('tarhal_user_country', JSON.stringify({
          data: result,
          expiry: Date.now() + (7 * 24 * 60 * 60 * 1000),
        }));
      } catch (e) { /* ignore */ }
      return result;
    }
  } catch (e) {
    console.warn('IP detection failed');
  }

  return fallback;
}

function clearDataCache() {
  Object.keys(localStorage).forEach(key => {
    if (key === 'tarhal_user_country') localStorage.removeItem(key);
  });
}