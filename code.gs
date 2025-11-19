const SPREADSHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID_HERE'; // 👈 แก้ตรงนี้
const SHEET_NAME = 'Records';

function doGet(e) {
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('ระบบบันทึกการปฏิบัติงาน');
}

// สร้าง/ดึงชีต + หัวตาราง
function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'id',
      'type',
      'date',
      'startTime',
      'endTime',
      'employeeName',
      'taskDescription',
      'location',
      'status',
      'rating',
      'comment',
      'timestamp'
    ]);
  }
  
  return sheet;
}

// อ่านข้อมูลทั้งหมด ส่งกลับไปหน้าเว็บ
function listRecords() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  
  if (values.length <= 1) {
    return [];
  }
  
  const data = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row[0]) continue;
    
    data.push({
      id: String(row[0]),
      type: row[1] || '',
      date: row[2] || '',
      startTime: row[3] || '',
      endTime: row[4] || '',
      employeeName: row[5] || '',
      taskDescription: row[6] || '',
      location: row[7] || '',
      status: row[8] || '',
      rating: Number(row[9] || 0),
      comment: row[10] || '',
      timestamp: Number(row[11] || 0)
    });
  }
  
  return data;
}

// เพิ่มข้อมูล 1 record
function addRecord(record) {
  const sheet = getSheet_();
  
  sheet.appendRow([
    record.id,
    record.type,
    record.date,
    record.startTime,
    record.endTime,
    record.employeeName,
    record.taskDescription,
    record.location,
    record.status,
    record.rating,
    record.comment,
    record.timestamp
  ]);
  
  return { success: true };
}
