import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";
import { renderToStaticMarkup } from "react-dom/server";

const otherProseChildren = [
  <h2 id="1">هاوەڵکاری چۆنییەتی مەتۆرێنە</h2>,
  <>
    <p>
      هاوەڵکاری چۆنییەتی دەبێت بەیەکەوە بنووسرێت و نابێت بەشەکانی لێک جیا
      بکرێنەوە.
    </p>
    <p>
      <span className="incorrect">بە باشی</span> کارەکە دەکەم.
      <br />
      <span className="correct">بەباشی</span> کارەکە دەکەم.
    </p>
    <p>
      <span className="incorrect">بە پێی</span> ئامارەکان
      <br />
      <span className="correct">بەپێی</span> ئامارەکان
    </p>
  </>,
  <h2 id="2">لەخۆتەوە &laquo;ی&raquo; قوت مەدە</h2>,
  <>
    <p>
      <span className="incorrect">دڵی</span> شکاند.
      <br />
      <span className="correct">دڵیی</span> شکاند.
    </p>
    <p>
      <span className="incorrect">کانی</span> سازگار.
      <br />
      <span className="correct">کانیی</span> سازگار.
    </p>
    <p>
      <span className="incorrect">یاریەکی</span> خۆش بوو.
      <br />
      <span className="correct">یارییەکی</span> خۆش بوو.
    </p>
    <p>
      ڕەنگە نووسینی سێ &laquo;ی&raquo; بەدوای یەکتر ڕاستییەکی تاڵ بێت بۆت، بەڵام
      ئیتر وایە و دەبێت لەگەڵی ڕا بێیت. نابێت هەرگیز ئامڕازی دانەپاڵ و جێناو ون
      بن.
    </p>
    <p>
      <span className="incorrect">کۆتایی</span> فیلمەکە
      <br />
      <span className="correct">کۆتاییی</span> فیلمەکە
    </p>
    <p>
      <span className="incorrect">کۆتاییان</span> پێ هێنا.
      <br />
      <span className="correct">کۆتایییان</span> پێ هێنا.
    </p>
    <p>
      هیچ نییە، زۆر <span className="incorrect">ئاساییە</span>.
      <br />
      هیچ نییە، زۆر <span className="incorrect">ئاسایە</span>.
      <br />
      هیچ نییە، زۆر <span className="correct">ئاسایییە</span>.
    </p>
  </>,
  <h2 id="3">وشە بە «ر» دەست پێ مەکە</h2>,
  <>
    <p>
      <span className="incorrect">رەنگ</span>
      <br />
      <span className="correct">ڕەنگ</span>
    </p>
  </>,
  <h2 id="4">&laquo;ك&raquo; پیتێکی کوردی نییە</h2>,
  <>
    <p>
      دەبێت کاراکتەری &laquo;ک&raquo; بەکار بێنیت کە &laquo;ک&raquo;ـی کوردی
      دەنوێنێت و لە کۆتاییی وشەکان بەڕێکی دەردەکەوێت.
    </p>
    <p>
      <span className="incorrect">خۆراك</span>
      <br />
      <span className="correct">خۆراک</span>
    </p>
  </>,
  <h2 id="5">&laquo;تر&raquo; و &laquo;-تر&raquo; دوو شتی جیان</h2>,
  <>
    <p>&laquo;تر&raquo; واتە دیکە/other. دەبێت سەربەخۆ بنووسرێت.</p>
    <p>
      <span className="incorrect">یەکێکیتر</span>
      <br />
      <span className="correct">یەکێکی تر</span>
    </p>
    <p>
      ترێکی تریش هەیە کە پاشگرێکە دەچێتە سەر هاوەڵناوی چۆنییەتی و چەندێتی، نابێت
      لە هاوەڵناوەکە جیا بکرێتەوە.
    </p>
    <p>
      <span className="incorrect">چاوڕەش تر</span>
      <br />
      <span className="correct">چاوڕەشتر</span>
    </p>
  </>,
  <h2 id="6">ئاگات لە &laquo;بێـ/بێ/بەبێ&raquo; بێت</h2>,
  <>
    <p>نابێت &laquo;بێ&raquo;ـی هاوەڵناو سەربەخۆ بنووسرێت.</p>
    <p>
      دراوێکی <span className="incorrect">بێ نرخ</span>
      <br />
      دراوێکی <span className="correct">بێنرخ</span>
    </p>
    <p>هاوەڵکارەکان سەربەخۆ دەنووسرێن.</p>
    <p>
      <span className="incorrect">بێئاو</span> ژیان نییە.
      <br />
      <span className="correct">بێ ئاو</span> ژیان نییە.
    </p>
    <p>
      <span className="incorrect">بە بێ</span> ئەوان ناکرێت.
      <br />
      <span className="correct">بەبێ</span> ئەوان ناکرێت.
    </p>
  </>,
  <h2 id="7">چاوگی لێکدراو و داڕێژراو</h2>,
  <>
    <p>بەشەکانی چاوگی لێکدراو و داڕێژراو نابێت لێک جیا بکرێنەوە.</p>
    <p>
      <span className="incorrect">کار کردن</span>
      <br />
      <span className="correct">کارکردن</span>
    </p>
    <p>
      <span className="incorrect">خۆ جوان کردن</span>
      <br />
      <span className="incorrect">خۆجوان کردن</span>
      <br />
      <span className="incorrect">خۆ جوانکردن</span>
      <br />
      <span className="correct">خۆجوانکردن</span>
    </p>
    <p>
      تەنیا یەک دۆخی شاز هەیە، ئەویش کاتێکە کە چاوگەکە لە &laquo;سێ پێشگر +
      چاوگێکی سادە&raquo; دروست دەبێت.
    </p>
    <p>
      <span className="incorrect">پێلێهەڵگرتن</span>
      <br />
      <span className="correct">پێ لێ هەڵگرتن</span>
    </p>
  </>,
  <h2 id="8">کاری سادە</h2>,
  <>
    <p>ئامڕازی نەرێکردن و چاوگ کاری سادە ناکەنە دوو بەش.</p>
    <p>
      <span className="incorrect">نەتان کرد</span>.
      <br />
      <span className="correct">نەتانکرد</span>.
    </p>
  </>,
  <h2 id="9">کاری داڕێژراو</h2>,
  <>
    <p>کاری داڕێژراو ئەگەر بەشێکی پێشەوەی بەر جێناو نەکەوت، جیا ناکرێتەوە.</p>
    <p>
      <span className="incorrect">تێ گەیشتم</span>.
      <br />
      <span className="correct">تێگەیشتم</span>.
    </p>
    <p>
      <span className="incorrect">هەڵ نەکرد</span>.
      <br />
      <span className="correct">هەڵنەکرد</span>.
    </p>
    <p>
      بەڵام ئەگەر بەشێکی پێشەوەی بەر جێناو کەوت، لە جێناوەکەوە جیا دەبێتەوە.
    </p>
    <p>
      <span className="incorrect">تێمگەیاند</span>.
      <br />
      <span className="correct">تێم گەیاند</span>.
    </p>
  </>,
  <h2 id="10">کاری لێکدراو</h2>,
  <>
    <p>دەبێت بەشەکانی کاری لێکدراو لێک جیا بکرێنەوە.</p>
    <p>
      <span className="incorrect">بەکارمهێنا</span>.
      <br />
      <span className="correct">بەکارم هێنا</span>.
    </p>
    <p>
      ئەوان <span className="incorrect">ڕێککەوتن</span>{" "}
      ڕێککەوتنەکە هەڵوەشێننەوە.
      <br />
      ئەوان <span className="correct">ڕێک کەوتن</span> ڕێککەوتنەکە هەڵوەشێننەوە.
    </p>
    <p>
      <span className="incorrect">خۆی باشکرد</span>.
      <br />
      <span className="correct">خۆی باش کرد</span>.
    </p>
  </>,
  <h2 id="11">&laquo;وو/û&raquo;</h2>,
  <>
    <p>
      وەک هەر پیتێکی دیکە، &laquo;وو/û&raquo;ـش پیتێکە و نابێت لەگەڵ
      &laquo;و/u&raquo; تێکەڵ بکرێت.
    </p>
    <p>
      شوێنێکی <span className="incorrect">دور</span>
      <br />
      شوێنێکی <span className="correct">دوور</span>
    </p>
    <p>
      هێڵی <span className="incorrect">سور</span>
      <br />
      هێڵی <span className="correct">سوور</span>
    </p>
  </>,
  <h2 id="12">وشە بە &laquo;وو&raquo; دەست پێ مەکە</h2>,
  <>
    <p>
      <span className="incorrect">ووزە</span>
      <br />
      <span className="correct">وزە</span>
    </p>
    <p>
      <span className="incorrect">ووشە</span>
      <br />
      <span className="correct">وشە</span>
    </p>
  </>,
  <h2 id="12">
    &laquo;وو/û&raquo; بکە &laquo;وو/uw&raquo;، نەک &laquo;و/iw&raquo;
  </h2>,
  <>
    <p>
      کاتێک بزوێنێک دەچێتە دوای پیتی &laquo;وو/û&raquo;، دەبێت بگۆڕدرێت بۆ
      &laquo;وو/uw&raquo;، نەک &laquo;و/iw&raquo;.
    </p>
    <p>
      <span className="incorrect">کردوە</span>
      <br />
      <span className="correct">کردووە</span>
    </p>
    <p>
      <span className="incorrect">هەموان</span>
      <br />
      <span className="correct">هەمووان</span>
    </p>
  </>,
];

const toc = (
  <ul>
    {otherProseChildren.filter((v) => v.type == "h2").map((
      v,
    ) => [v.props.id, v.props.children]).map(([id, text], i) => (
      <li key={i}>
        <a href={`#${id}`}>{text}</a>
      </li>
    ))}
  </ul>
);

const html = (
  <html dir="rtl" className="scroll-smooth">
    <head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ڕێنووس بەپەلە</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap"
      />
      <link rel="stylesheet" href="./main.css" />
    </head>
    <body className="bg-light font-nsa text-dark p-5">
      <main className="mx-auto max-w-2xl prose lg:prose-lg dark:prose-invert prose-ul:pl-0 prose-ul:pr-5">
        <h1>ڕێنووس بەپەلە</h1>
        <p>
          ئەم پەڕەیە ڕێساکانی ڕێنووسی کوردیت بەکورتی بۆ ڕوون دەکاتەوە. بۆ ئەو
          کەسانە دروست کراوە کە ئاشنا نین پێی و دەیانەوێت بەپەلە لەسەری بزانن.
          ئەگەر لە داهاتوو کاتی زیاتر هەبوو، دەتوانرێت پەرتووکی &laquo;دیاکۆ
          هاشمی &mdash; پوختەی ڕێنووس و خاڵبەندی&raquo; بخوێنرێتەوە، کە بە
          درێژتر و وردتر باسی دەکات و لە زۆربەی کتێبخانەکان بەردەستە.
        </p>
        <h2>ناوەڕۆک</h2>
        {toc}
        {otherProseChildren}
      </main>
      <footer className="mx-auto max-w-2xl prose lg:prose-lg dark:prose-invert pt-20 pb-5 prose-a:no-underline">
        <p>
          <sub>
            لەژێر کاردایە &middot;{" "}
            <a href="https://github.com/roj1512/renus-bepele">
              سەرچاوە
            </a>{" "}
            &middot; <a href="https://roj.im">ڕۆژ</a>
          </sub>
        </p>
      </footer>
    </body>
  </html>
);

const path = join(dirname(fileURLToPath(import.meta.url)), "index.html");
const content = "<!DOCTYPE html>" + renderToStaticMarkup(html);

writeFileSync(path, content);
