// كود Google Apps Script لاستقبال البيانات من النموذج وإضافتها إلى Google Sheet
// انسخ هذا الكود ووضعه في مشروع Google Apps Script جديد

function doGet(e) {
  return handleResponse(e);
}

function doPost(e) {
  return handleResponse(e);
}

function handleResponse(e) {
  // معرّف جدول البيانات الخاص بك
  const ss = SpreadsheetApp.openById('1BLXsR40lJgpmSt_tDOFKJ1vIMPdCuGeNboez6kZNBzE');
  const sheet = ss.getSheetByName('Sheet1') || ss.getSheets()[0];
  
  // بيانات الطلب
  const data = e.parameter;
  
  // تحقق من وجود جميع البيانات المطلوبة
  if (!data.order_number || !data.customer_name || !data.customer_mobile) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'بيانات غير مكتملة' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // إضافة صف جديد بالبيانات
  sheet.appendRow([
    data.order_number,
    data.customer_name,
    data.customer_mobile,
    data.customer_address,
    data.order_notes,
    data.product_details,
    data.total_items,
    data.total_price,
    data.order_date || new Date().toISOString(),
    new Date() // وقت الإضافة
  ]);
  
  // إرسال رد النجاح
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// عند نشر هذا السكريبت، حدد:
// 1. Deploy > New deployment
// 2. اختر Web app
// 3. الوصول: "Anyone"
// 4. انقر على "Deploy"
// 5. انسخ عنوان URL وأضفه في ملف script.js بدلاً من "YOUR_DEPLOYMENT_ID_HERE" 