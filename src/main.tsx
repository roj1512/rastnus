import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";
import { renderToStaticMarkup } from "react-dom/server";

const otherProseChildren = [
  <h2 id="1">هاوەڵکاری چۆنییەتی مەشکێنە</h2>,
  <>
    <p>
      هاوەڵکاری چۆنییەتی دەبێت بەیەکەوە بنووسرێت و نابێت بەشەکانی لێک جیا
      بکرێنەوە.
    </p>
    <p>
      <span className="bg-incorrect">بە باشی</span> کارەکە دەکەم.
      <br />
      <span className="bg-correct">بەباشی</span> کارەکە دەکەم.
    </p>
    <p>
      <span className="bg-incorrect">بە پێی</span> ئامارەکان
      <br />
      <span className="bg-correct">بەپێی</span> ئامارەکان
    </p>
  </>,
  <h2 id="2">لەخۆتەوە &laquo;ی&raquo; قوت مەدە</h2>,
  <>
    <p>
      <span className="bg-incorrect">دڵی</span> شکاند.
      <br />
      <span className="bg-correct">دڵیی</span> شکاند.
    </p>
    <p>
      <span className="bg-incorrect">کانی</span> سازگار
      <br />
      <span className="bg-correct">کانیی</span> سازگار
    </p>
    <p>
      <span className="bg-incorrect">یاریەکی</span> خۆش بوو.
      <br />
      <span className="bg-correct">یارییەکی</span> خۆش بوو.
    </p>
    <p>
      ڕەنگە نووسینی سێ &laquo;ی&raquo; بەدوای یەکتر ڕاستییەکی تاڵ بێت بۆت، بەڵام
      ئیتر وایە و دەبێت لەگەڵی ڕا بێیت. نابێت هەرگیز ئامڕازی دانەپاڵ و جێناو ون
      بن.
    </p>
    <p>
      <span className="bg-incorrect">کۆتایی</span> فیلمەکە
      <br />
      <span className="bg-correct">کۆتاییی</span> فیلمەکە
    </p>
    <p>
      <span className="bg-incorrect">کۆتاییان</span> پێ هێنا.
      <br />
      <span className="bg-correct">کۆتایییان</span> پێ هێنا.
    </p>
    <p>
      هیچ نییە، زۆر <span className="bg-incorrect">ئاساییە</span>.
      <br />
      هیچ نییە، زۆر <span className="bg-incorrect">ئاسایە</span>.
      <br />
      هیچ نییە، زۆر <span className="bg-correct">ئاسایییە</span>.
    </p>
  </>,
  <h2 id="3">وشە بە «ر» دەست پێ مەکە</h2>,
  <>
    <p>
      <span className="bg-incorrect">رەنگ</span>
      <br />
      <span className="bg-correct">ڕەنگ</span>
    </p>
  </>,
  <h2 id="4">&laquo;ك&raquo; پیتێکی کوردی نییە</h2>,
  <>
    <p>
      دەبێت کاراکتەری &laquo;ک&raquo; بەکار بێنیت کە &laquo;ک&raquo;ـی کوردی
      دەنوێنێت و لە کۆتاییی وشەکان بەڕێکی دەردەکەوێت.
    </p>
    <p>
      <span className="bg-incorrect">خۆراك</span>
      <br />
      <span className="bg-correct">خۆراک</span>
    </p>
  </>,
  <h2 id="5">&laquo;تر&raquo; و &laquo;-تر&raquo; دوو شتی جیان</h2>,
  <>
    <p>&laquo;تر&raquo; واتە دیکە/other. دەبێت سەربەخۆ بنووسرێت.</p>
    <p>
      <span className="bg-incorrect">یەکێکیتر</span>
      <br />
      <span className="bg-correct">یەکێکی تر</span>
    </p>
    <p>
      ترێکی تریش هەیە کە پاشگرێکە دەچێتە سەر هاوەڵناوی چۆنییەتی و چەندێتی، نابێت
      لە هاوەڵناوەکە جیا بکرێتەوە.
    </p>
    <p>
      <span className="bg-incorrect">چاوڕەش تر</span>
      <br />
      <span className="bg-correct">چاوڕەشتر</span>
    </p>
  </>,
  <h2 id="6">ئاگات لە &laquo;بێـ/بێ/بەبێ&raquo; بێت</h2>,
  <>
    <p>نابێت &laquo;بێ&raquo;ـی هاوەڵناو سەربەخۆ بنووسرێت.</p>
    <p>
      دراوێکی <span className="bg-incorrect">بێ نرخ</span>
      <br />
      دراوێکی <span className="bg-correct">بێنرخ</span>
    </p>
    <p>هاوەڵکارەکان سەربەخۆ دەنووسرێن.</p>
    <p>
      <span className="bg-incorrect">بێئاو</span> ژیان نییە.
      <br />
      <span className="bg-correct">بێ ئاو</span> ژیان نییە.
    </p>
    <p>
      <span className="bg-incorrect">بە بێ</span> ئەوان ناکرێت.
      <br />
      <span className="bg-correct">بەبێ</span> ئەوان ناکرێت.
    </p>
  </>,
  <h2 id="7">چاوگی لێکدراو و داڕێژراو</h2>,
  <>
    <p>بەشەکانی چاوگی لێکدراو و داڕێژراو نابێت لێک جیا بکرێنەوە.</p>
    <p>
      <span className="bg-incorrect">کار کردن</span>
      <br />
      <span className="bg-correct">کارکردن</span>
    </p>
    <p>
      <span className="bg-incorrect">خۆ جوان کردن</span>
      <br />
      <span className="bg-incorrect">خۆجوان کردن</span>
      <br />
      <span className="bg-incorrect">خۆ جوانکردن</span>
      <br />
      <span className="bg-correct">خۆجوانکردن</span>
    </p>
    <p>
      تەنیا یەک دۆخی شاز هەیە، ئەویش کاتێکە کە چاوگەکە لە &laquo;سێ پێشگر +
      چاوگێکی سادە&raquo; دروست دەبێت.
    </p>
    <p>
      <span className="bg-incorrect">پێلێهەڵگرتن</span>
      <br />
      <span className="bg-correct">پێ لێ هەڵگرتن</span>
    </p>
  </>,
  <h2 id="8">کاری سادە</h2>,
  <>
    <p>ئامڕازی نەرێکردن و جێناو کاری سادە ناکەنە دوو بەش.</p>
    <p>
      <span className="bg-incorrect">نەتان کرد</span>.
      <br />
      <span className="bg-correct">نەتانکرد</span>.
    </p>
  </>,
  <h2 id="9">کاری داڕێژراو</h2>,
  <>
    <p>کاری داڕێژراو ئەگەر بەشێکی پێشەوەی بەر جێناو نەکەوت، جیا ناکرێتەوە.</p>
    <p>
      <span className="bg-incorrect">تێ گەیشتم</span>.
      <br />
      <span className="bg-correct">تێگەیشتم</span>.
    </p>
    <p>
      <span className="bg-incorrect">هەڵ نەکرد</span>.
      <br />
      <span className="bg-correct">هەڵنەکرد</span>.
    </p>
    <p>
      بەڵام ئەگەر بەشێکی پێشەوەی بەر جێناو کەوت، لە جێناوەکەوە جیا دەبێتەوە.
    </p>
    <p>
      <span className="bg-incorrect">تێمگەیاند</span>.
      <br />
      <span className="bg-correct">تێم گەیاند</span>.
    </p>
  </>,
  <h2 id="10">کاری لێکدراو</h2>,
  <>
    <p>دەبێت بەشەکانی کاری لێکدراو لێک جیا بکرێنەوە.</p>
    <p>
      <span className="bg-incorrect">بەکارمهێنا</span>.
      <br />
      <span className="bg-correct">بەکارم هێنا</span>.
    </p>
    <p>
      ئەوان <span className="bg-incorrect">ڕێککەوتن</span>{" "}
      ڕێککەوتنەکە هەڵوەشێننەوە.
      <br />
      ئەوان <span className="bg-correct">ڕێک کەوتن</span>{" "}
      ڕێککەوتنەکە هەڵوەشێننەوە.
    </p>
    <p>
      <span className="bg-incorrect">خۆی باشکرد</span>.
      <br />
      <span className="bg-correct">خۆی باش کرد</span>.
    </p>
  </>,
  <h2 id="11">&laquo;وو/û&raquo;</h2>,
  <>
    <p>
      وەک هەر پیتێکی دیکە، &laquo;وو/û&raquo;ـش پیتێکە و نابێت لەگەڵ
      &laquo;و/u&raquo; تێکەڵ بکرێت.
    </p>
    <p>
      شوێنێکی <span className="bg-incorrect">دور</span>
      <br />
      شوێنێکی <span className="bg-correct">دوور</span>
    </p>
    <p>
      هێڵی <span className="bg-incorrect">سور</span>
      <br />
      هێڵی <span className="bg-correct">سوور</span>
    </p>
  </>,
  <h2 id="12">وشە بە &laquo;وو&raquo; دەست پێ مەکە</h2>,
  <>
    <p>
      <span className="bg-incorrect">ووزە</span>
      <br />
      <span className="bg-correct">وزە</span>
    </p>
    <p>
      <span className="bg-incorrect">ووشە</span>
      <br />
      <span className="bg-correct">وشە</span>
    </p>
  </>,
  <h2 id="13">
    &laquo;وو/û&raquo; بکە &laquo;وو/uw&raquo;، نەک &laquo;و/iw&raquo;
  </h2>,
  <>
    <p>
      کاتێک بزوێنێک دەچێتە دوای پیتی &laquo;وو/û&raquo;، دەبێت بگۆڕدرێت بۆ
      &laquo;وو/uw&raquo;، نەک &laquo;و/iw&raquo;.
    </p>
    <p>
      <span className="bg-incorrect">کردوە</span>
      <br />
      <span className="bg-correct">کردووە</span>
    </p>
    <p>
      <span className="bg-incorrect">هەموان</span>
      <br />
      <span className="bg-correct">هەمووان</span>
    </p>
  </>,
  <h2 id="14">ئامڕازی پەیوەندی بەجیا بنووسە</h2>,
  <>
    <p>
      <span className="bg-incorrect">بەپێی</span> خۆی هاتە ئێرە.
      <br />
      <span className="bg-correct">بە پێی</span> خۆی هاتە ئێرە.
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
        href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap"
      />
      <link rel="stylesheet" href="./main.css" />
    </head>
    <body className="bg-light font-vazirmatn text-dark p-5">
      <main className="mx-auto max-w-2xl prose lg:prose-lg dark:prose-invert prose-ul:pl-0 prose-ul:pr-5">
        <h1>ڕێنووس بەپەلە</h1>
        <p>
          ئەم پەڕەیە ڕێساکانی ڕێنووسی کوردیت بەکورتی بۆ ڕوون دەکاتەوە. بۆ ئەو
          کەسانە دروست کراوە کە ئاشنا نین پێی و دەیانەوێت بەپەلە لەسەری بزانن.
          ئەگەر لە داهاتوو کاتی زیاتر هەبوو، دەتوانرێت پەرتووکی &laquo;دیاکۆ
          هاشمی &mdash; پوختەی ڕێنووس و خاڵبەندی&raquo; بخوێنرێتەوە، کە بەدرێژی
          و وردتر باسی دەکات و لە زۆربەی کتێبخانەکان بەردەستە.
        </p>
        <h2>ناوەڕۆک</h2>
        {toc}
        {...otherProseChildren}
      </main>
      <footer className="mx-auto max-w-2xl prose lg:prose-lg dark:prose-invert pt-20 pb-5 prose-a:font-bold prose-a:no-underline">
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
