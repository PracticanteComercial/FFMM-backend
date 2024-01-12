const Router = require("koa-router");
const ExcelJS = require("exceljs");
const { koaBody } = require("koa-body");

const router = new Router();

router.use(koaBody({
    multipart: true,
}));

router.get("FFMM.show", "/FFMMs", async (ctx) => {
    try {
        const FFMMs = await ctx.orm.FFMMs.findAll();
        ctx.body = { FFMMs };
        ctx.status = 200;
    } catch (error) {
        ctx.throw(500, error);
    }
});

// router.post("/FFMMs/upload", async (ctx) => {
//     try {
//         const file = ctx.request.files.file;
//         const workbook = new ExcelJS.Workbook();
//         await workbook.xlsx.load(file.path);

//         const worksheet = workbook.getWorksheet(1);

//         const FFMMsData = [];

//         worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
//             if (rowNumber > 1) {
//                 const rowData = {
//                     name: row.getCell(2).value,
//                     agf: row.getCell(1).value,
//                     run: row.getCell(3).value,
//                     series: row.getCell(4).value,
//                     money: row.getCell(5).value,
//                     type: row.getCell(6).value,
//                     monthly: row.getCell(7).value,
//                     ytd: row.getCell(8).value,
//                     yearly: row.getCell(9).value,
//                     rescueability: row.getCell(10).value,
//                     rickLevel: row.getCell(11).value,
//                     bylawLink: row.getCell(12).value,
//                     dataSheetLink: row.getCell(13).value,
//                     invertLink: row.getCell(14).value,
//                 };

//                 FFMMsData.push(rowData);
//             }
//         });

//         const createdFFMMs = await Promise.all(FFMMsData.map(data =>
//             ctx.orm.FFMMs.findOrCreate({ where: { run: data.run }, defaults: data })
//         ));

//         ctx.body = { FFMMs: createdFFMMs.map(([ffmm]) => ffmm.toJSON()) };
//         ctx.status = 201;
//     } catch (error) {
//         ctx.throw(500, error);
//     }
// });


module.exports = router;