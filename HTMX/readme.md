این تحقیق توسط امیرمحمد بندری، متین محمدی و سینا عزیزالدین انجام شده است.

# معرفی ابزار HTMX

ابزار HTMX یک کتابخانه‌ی کوچک جاوااسکریپتی است که به شما اجازه می‌دهد بدون نوشتن JavaScript، درخواست‌های AJAX انجام بدید، محتوا رو بارگذاری یا جایگزین کنید و تجربه کاربری تعاملی‌تری بسازید.

---

## نصب HTMX

برای شروع، فقط کافیه این خط رو به `<head>` صفحه HTML خود اضافه کنید:

```html
<script src="https://unpkg.com/htmx.org@1.9.10"></script>
```

یا همونطور که در این پروژه انجام دادیم، فایل `htmx.min.js` رو داخل پروژه‌تون اضافه کنید و از اون استفاده کنید.

---

## درخواست GET با HTMX

با استفاده از ویژگی `hx-get`، می‌تونید یک درخواست GET به سرور بفرستید و نتیجه رو در یک عنصر خاص بارگذاری کنید.

### فایل: `get-example.html`

```html
<!DOCTYPE html>
<html lang="fa">
<head>
  <meta charset="UTF-8">
  <title>مثال GET با HTMX</title>
  <script src="https://unpkg.com/htmx.org@1.9.10"></script>
</head>
<body>

  <button hx-get="message.html" hx-target="#result" hx-swap="innerHTML">
    دریافت پیام
  </button>

  <div id="result"></div>

</body>
</html>
```

### فایل کمکی: `message.html`

```html
<p>سلام! این پیام با HTMX لود شده است.</p>
```

---

## ارسال فرم (POST)

ابزار HTMX به‌راحتی فرم‌ها رو هم پشتیبانی می‌کنه. فقط کافیه `hx-post` رو اضافه کنید.

### فایل: `post-example.html`

```html
<!DOCTYPE html>
<html lang="fa">
<head>
  <meta charset="UTF-8">
  <title>مثال POST با HTMX</title>
  <script src="https://unpkg.com/htmx.org@1.9.10"></script>
</head>
<body>

  <form hx-post="submit.html" hx-target="#response" hx-swap="innerHTML">
    <input type="text" name="name" placeholder="نام شما" required>
    <button type="submit">ارسال</button>
  </form>

  <div id="response"></div>

</body>
</html>
```

### فایل کمکی: `submit.html`

```html
<p>اطلاعات با موفقیت ارسال شد.</p>
```

---

## ویژگی‌های مهم HTMX

| ویژگی HTMX      | توضیح |
|------------------|--------|
| `hx-get`         | ارسال درخواست GET |
| `hx-post`        | ارسال درخواست POST |
| `hx-target`      | تعیین محل نمایش پاسخ |
| `hx-swap`        | نحوه‌ی جایگزینی محتوای پاسخ (مثل `innerHTML`, `outerHTML`, `beforebegin`, ...) |
| `hx-trigger`     | تعیین زمان انجام درخواست (مثلاً `click`, `load`, `change`, ...) |

---

## لود خودکار هنگام بارگذاری صفحه

### فایل: `load-on-page.html`

```html
<!DOCTYPE html>
<html lang="fa">
<head>
  <meta charset="UTF-8">
  <title>لود خودکار</title>
  <script src="https://unpkg.com/htmx.org@1.9.10"></script>
</head>
<body>

  <div hx-get="message.html" hx-trigger="load" hx-target="this"></div>

</body>
</html>
```

---

## ترکیب با سرور

ابزار HTMX نیازی به API JSON نداره. مستقیماً HTML از سرور می‌گیره. فقط کافیه سرور شما خروجی HTML بده، نه JSON. این کار توسعه با زبان‌هایی مثل PHP، Python (با Flask یا Django)، Go و غیره رو ساده‌تر می‌کنه.

این پروژه یک سرویس flask پایتونی است که بخش front-end آن از HTMX استفاده می‌کند. برای اجرای این پروژه کافی‌ست flask را نصب کنید و سپس `python app.py` را اجرا کنید.

---

## مزایای HTMX

 - کاهش نیاز به JavaScript
 - سرعت بالا
 - پشتیبانی از HTML به‌عنوان پاسخ
 - ساده ولی قدرتمند

---

## مرجع

برای کسب اطلاعات بیشتر و بررسی دقیق‌تر کارایی‌های این ابزار (مثلا delete که از آن در پروژه‌ی نمونه استفاده کرده‌ایم) می‌توانید به `https://htmx.org/docs` مراجعه کنید.