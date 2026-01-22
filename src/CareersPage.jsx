import React, { useState, useEffect } from 'react';
import { fetchJobs, submitApplication } from './services/api';

const CareersPage = ({ lang }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    cv: null
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'submitting', 'success', 'error'

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs", error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, cv: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    if (!formData.cv) {
        alert("Please upload a CV");
        setSubmitStatus(null);
        return;
    }

    const data = new FormData();
    data.append('full_name', formData.full_name);
    data.append('email', formData.email);
    data.append('cv', formData.cv);

    try {
      await submitApplication(data);
      setSubmitStatus('success');
      setFormData({ full_name: '', email: '', cv: null });
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const isRTL = lang === 'ar';

  return (
    <div className={`min-h-screen pb-24 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-white dark:bg-gray-900 curved-divider pb-12 shadow-sm">
        <div className="relative h-[320px] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <div 
            className="h-full w-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCh_LxOblTXelhKWMOGQzzwVY4utALBK3xEkFEQWPUCBtIrighfPlV9FmybPT3odKqfZlxt5FFrkyyvCFAW7hHXGOhN6s4yffH3RhARZKlFJm87El1Dchh7gp5uAKCAFHJTmvOp7Pfh0bbz5QMp5tEVCsPTPKLCB3hGQoB7S5MxIBEtesNg42LgfGz2zzmVgZfFR4urs50xG7jWZpYezYOAcX0s1nCEN5_I8DDLwIwqMFpHnsdPuifS4NVWIi_pr2VeD-AwaahPQVc')" }}
          ></div>
          <div className={`absolute bottom-6 ${isRTL ? 'right-6 left-6' : 'left-6 right-6'} z-20`}>
            <h1 className="text-white text-4xl font-extrabold tracking-tight mb-2 leading-tight">
              {lang === 'en' ? 'Join Our Team' : 'انضم لفريقنا'}
            </h1>
            <p className="text-white/90 text-sm max-w-[280px] leading-relaxed">
              {lang === 'en' 
                ? 'Be part of a community dedicated to excellence in global food sourcing and supply chain innovation.' 
                : 'كن جزءًا من مجتمع مكرس للتميز في توفير الأغذية العالمية والابتكار في سلسلة التوريد.'}
            </p>
          </div>
        </div>
      </header>

      {/* Values Section */}
      <section className="mt-8 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold tracking-tight">
             {lang === 'en' ? 'Why Tanorin?' : 'لماذا تنورين؟'}
          </h2>
          <span className="text-primary text-xs font-bold uppercase tracking-wider">
             {lang === 'en' ? 'Our Values' : 'قيمنا'}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">trending_up</span>
            </div>
            <h3 className="font-bold text-lg mb-1">{lang === 'en' ? 'Growth' : 'النمو'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {lang === 'en' ? 'Continuous learning and career advancement pathways for everyone.' : 'مسارات للتعلم المستمر والتقدم الوظيفي للجميع.'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="size-12 bg-secondary-green/10 rounded-lg flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-secondary-green text-2xl">favorite</span>
            </div>
            <h3 className="font-bold text-lg mb-1">{lang === 'en' ? 'Culture' : 'الثقافة'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
               {lang === 'en' ? 'A diverse, supportive, and human-centric workplace culture.' : 'ثقافة عمل متنوعة وداعمة تركز على الإنسان.'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="size-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-blue-500 text-2xl">verified_user</span>
            </div>
            <h3 className="font-bold text-lg mb-1">{lang === 'en' ? 'Stability' : 'الاستقرار'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
               {lang === 'en' ? 'Established global presence with a long-term vision for the future.' : 'وجود عالمي راسخ مع رؤية طويلة المدى للمستقبل.'}
            </p>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="mt-8 px-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-extrabold tracking-tight mb-4">{lang === 'en' ? 'Current Openings' : 'الوظائف المتاحة'}</h2>
        
        {loading ? (
             <div className="text-center py-10"><span className="material-symbols-outlined animate-spin">refresh</span></div>
        ) : jobs.length === 0 ? (
            <p className="text-gray-500 text-sm">{lang === 'en' ? 'No current openings.' : 'لا توجد وظائف متاحة حالياً.'}</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg leading-tight">{lang === 'en' ? job.title_en : job.title_ar}</h3>
                        <div className="flex items-center gap-2 mt-1">
                        <span className="material-symbols-outlined text-sm text-gray-400">location_on</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{lang === 'en' ? job.location_en : job.location_ar}</span>
                        </div>
                    </div>
                    <span className="bg-secondary-green/10 text-secondary-green text-[10px] font-bold px-2 py-1 rounded uppercase">{job.type}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 border-l-2 border-primary/20 pl-3">
                    <p className="line-clamp-2">{lang === 'en' ? job.description_short_en : job.description_short_ar}</p>
                    </div>
                    {/* WhatsApp Apply Button - assuming dynamic number if needed, or static generic */}
                    <a 
                        href={`https://wa.me/966500000000?text=I'm%20interested%20in%20the%20${encodeURIComponent(job.title_en)}%20role`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#22c35e] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                    >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.301-.15-1.767-.872-2.04-.971-.272-.099-.47-.15-.669.15-.199.3-.77.971-.944 1.171-.174.199-.349.224-.65.074-.3-.15-1.265-.467-2.41-1.485-.89-.793-1.49-1.772-1.664-2.071-.174-.3-.019-.462.13-.61.135-.133.301-.35.451-.525.149-.174.199-.299.299-.499.1-.2.05-.375-.025-.525-.075-.15-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.299-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.199 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.016-1.416.249-.695.249-1.292.174-1.416-.075-.124-.275-.199-.57-.349zM12 21.335c-1.611 0-3.19-.433-4.577-1.25l-.33-.196-3.4.892.908-3.313-.215-.342c-.901-1.436-1.378-3.102-1.378-4.814 0-4.99 4.06-9.051 9.053-9.051 2.417 0 4.69.941 6.398 2.651 1.708 1.71 2.648 3.983 2.648 6.4 0 4.991-4.06 9.051-9.051 9.051zM12 0C5.383 0 0 5.383 0 12c0 2.112.55 4.17 1.594 5.989L0 24l6.191-1.623C7.942 23.328 9.947 24 12 24c6.617 0 12-5.383 12-12S18.617 0 12 0z"></path>
                    </svg>
                     {lang === 'en' ? 'Apply via WhatsApp' : 'قدم عبر واتساب'}
                    </a>
                </div>
              ))}
            </div>
        )}
      </section>

      {/* General Application Form */}
      <section className="mt-12 px-4 max-w-2xl mx-auto mb-16">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-dashed border-primary/20">
            <h2 className="text-xl font-extrabold tracking-tight mb-2">
                {lang === 'en' ? "Didn't find a match?" : "لم تجد وظيفة مناسبة؟"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {lang === 'en' 
                    ? "Send us your CV anyway. We're always looking for talented individuals to join our network." 
                    : "أرسل لنا سيرتك الذاتية على أي حال. نحن نبحث دائمًا عن أفراد موهوبين للانضمام إلى شبكتنا."}
            </p>
            
            {submitStatus === 'success' ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-bold">
                    {lang === 'en' ? 'Application received successfully!' : 'تم استلام طلبك بنجاح!'}
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">
                            {lang === 'en' ? 'Full Name' : 'الاسم الكامل'}
                        </label>
                        <input 
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20" 
                            placeholder={lang === 'en' ? "John Doe" : "الاسم"} 
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">
                             {lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                        </label>
                        <input 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20" 
                            placeholder="email@example.com" 
                            type="email"
                        />
                    </div>
                    <div className="relative">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">
                             {lang === 'en' ? 'Your CV' : 'السيرة الذاتية'}
                        </label>
                        <div className="relative w-full border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100 transition-colors">
                            <input 
                                type="file" 
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="p-6 flex flex-col items-center pointer-events-none">
                                <span className="material-symbols-outlined text-3xl mb-2">upload_file</span>
                                <span className="text-xs font-medium">
                                    {formData.cv ? formData.cv.name : (lang === 'en' ? "Click to upload or drag & drop" : "انقر للتحميل")}
                                </span>
                                <span className="text-[10px] mt-1 text-gray-400">PDF, DOC (Max 5MB)</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={submitStatus === 'submitting'}
                        className="w-full bg-primary/10 hover:bg-primary/20 text-primary py-4 rounded-xl font-extrabold text-sm active:bg-primary/20 transition-colors disabled:opacity-50"
                    >
                         {submitStatus === 'submitting' 
                            ? (lang === 'en' ? 'Submitting...' : 'جاري الإرسال...') 
                            : (lang === 'en' ? 'Submit Application' : 'إرسال الطلب')}
                    </button>
                    {submitStatus === 'error' && (
                        <p className="text-center text-red-500 text-xs">
                            {lang === 'en' ? 'Something went wrong. Please try again.' : 'حدث خطأ ما. حاول مرة اخرى.'}
                        </p>
                    )}
                </form>
            )}
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
