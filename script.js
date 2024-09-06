const stars = document.querySelectorAll(".star");
const ratingSystem = document.getElementById('ratingSystem');
const thankYouMessage = document.getElementById('thankYouMessage');
const errorMessage = document.getElementById('error-message');
const commentField = document.getElementById('comment');

let ratingValue = 0;

// التعامل مع تقييم النجوم
stars.forEach((star) => {
  star.addEventListener("mouseover", () => {
    const value = star.getAttribute("data-value");
    highlightStars(value);
  });

  star.addEventListener("mouseout", () => {
    highlightStars(ratingValue);
  });

  star.addEventListener("click", () => {
    ratingValue = star.getAttribute("data-value");
    document
      .querySelectorAll(".star")
      .forEach((s) => s.classList.remove("selected"));
    star.classList.add("selected");
    highlightStars(ratingValue);
  });
});

function highlightStars(value) {
  stars.forEach((star) => {
    if (star.getAttribute("data-value") <= value) {
      star.classList.add("highlight");
    } else {
      star.classList.remove("highlight");
    }
  });
}

// التعامل مع إرسال النموذج
document.getElementById('ratingForm').addEventListener('submit', function(event) {
  event.preventDefault(); // منع إرسال النموذج بشكل طبيعي

  // التحقق من وجود تقييم وتعليق
  if (ratingValue === 0 || commentField.value.trim() === '') {
    errorMessage.style.display = 'block'; // عرض رسالة الخطأ
    return; // إيقاف الإرسال
  }

  // إخفاء نظام التقييم تدريجياً
  ratingSystem.style.opacity = '0';

  // عرض رسالة الشكر
  thankYouMessage.style.display = 'block';
  thankYouMessage.style.opacity = '1';

  // إخفاء رسالة الشكر وعرض نظام التقييم مرة أخرى بعد 3 ثوانٍ
  setTimeout(function() {
    thankYouMessage.style.opacity = '0';

    setTimeout(function() {
      thankYouMessage.style.display = 'none';

      // إعادة تعيين النجوم
      stars.forEach(star => {
        star.classList.remove('selected');
        star.classList.remove('highlight'); // التأكد من إزالة فئة التمييز أيضاً
      });
      ratingValue = 0; // إعادة تعيين قيمة التقييم إلى 0
      
      // مسح النص في مربع التعليق
      commentField.value = '';

      // إخفاء رسالة الخطأ
      errorMessage.style.display = 'none';
      
      // عرض نظام التقييم مرة أخرى
      ratingSystem.style.opacity = '1';
    }, 1000); // الوقت اللازم لإكمال الانتقال تدريجياً
  }, 3000); // تأخير 3 ثوانٍ
});
function highlightStars(value) {
  stars.forEach((star) => {
    if (star.getAttribute("data-value") <= value) {
      star.classList.add("highlight");
    } else {
      star.classList.remove("highlight");
    }
  });
}
