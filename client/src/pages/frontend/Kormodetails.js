import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFindCategoriesQuery } from "../../redux/api/categoryApiSlice";
import Loader from "../../components/custom/Loader";

export default function Kormodetails() {
  const params = useParams();
  const { data, isLoading } = useFindCategoriesQuery(params?.slug);
  const category = data?.data;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="breadcrumbs" data-stellar-background-ratio="0.5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content left">
                <h1 className="page-title">{category?.name}</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content right">
                <ul className="breadcrumb-nav">
                  <li>
                    <Link to="/">হোম পেইজ</Link>
                  </li>
                  <li>{category?.name}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section py-5 pb-0 blog-single">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-5 col-md-6 col-12 ">
              <div className="post-thumbnils">
                <img src={category?.image} alt="#" className="w-100 rounded" />
              </div>
            </div>
            <aside className="col-lg-7 col-md-6 col-12">
              <div className="sidebar">
                <div className="widget popular-tag-widget">
                  <h5 className="widget-title">{category?.name}</h5>
                  <div className="tags">
                    {category?.childCategories.map((item) => (
                      <Link to="#">{item.name}</Link>
                    ))}
                  </div>
                  {/* <p className="mt-4">
                    "সাহিত্য কর্ম" একটি গুরুত্বপূর্ণ কার্যক্রম, যা সাহিত্যিক
                    সৃষ্টিকর্মীদের সাথে সংগঠিত যায়। এটি সাহিত্যের প্রসারে এবং
                    সাহিত্যিক প্রকাশনায় অবদান রাখে। "সাহিত্য কর্ম" সাধারণত লেখক,
                    কবি, উপন্যাসিক, পাত্রিকিক সম্পাদক, প্রকাশক ইত্যাদির সমন্বয়ে
                    সাধারণ হয়ে থাকে। এটি নতুন লেখকদের সাহিত্যিক দক্ষতা উন্নয়নে ও
                    তাদের কাজের উত্তরাধিকার বৃদ্ধি করে। সাহিত্য প্রতিষ্ঠান, লেখক
                    সম্পাদক সংঘ, প্রকাশনা সংস্থা ইত্যাদি "সাহিত্য কর্ম"
                    অনুষ্ঠানে অংশগ্রহণ করে সাহিত্যিক প্রগতির পথে অবদান রাখে।
                  </p> */}
                  <div className="button2 mt-4 mb-1">
                    <Link to="yuyu" className="btn mouse-dir white-bg">
                      রেজিস্ট্রেশনের নিয়মাবলী <span className="dir-part" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
