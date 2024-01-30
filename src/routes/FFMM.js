const Router = require("koa-router");
const ExcelJS = require("exceljs");
const { koaBody } = require("koa-body");
const XLSX = require('xlsx');


const router = new Router();

// GET all FFMMs
router.get("FFMM.show", "/FFMMs", async (ctx) => {
    try {
        const FFMMs = await ctx.orm.FFMMs.findAll();
        ctx.body = { FFMMs };
        ctx.status = 200;
    } catch (error) {
        ctx.throw(500, error);
    }
});

// POST a new FFMM
router.post("FFMM.create", "/FFMMs", async (ctx) => {
    try {
        const FFMM = await ctx.orm.FFMMs.create(ctx.request.body);
        ctx.body = { FFMM };
        ctx.status = 201;
    } catch (error) {
        ctx.throw(500, error);
    }
});

// DELETE a FFMM
router.delete("FFMM.delete", "/FFMMs/:id", async (ctx) => {
    try {
        const FFMM = await ctx.orm.FFMMs.findOne({ where: { id: ctx.params.id } });
        if (!FFMM) {
            ctx.throw(404, "FFMM not found");
        }
        await FFMM.destroy();
        ctx.body = { FFMM };
        ctx.status = 204;
    } catch (error) {
        ctx.throw(500, error);
    }
});

// POST a lot of FFMMs (upload excel file)
router.post("/FFMMs/upload", koaBody({ multipart: true }), async (ctx) => {
    try {
        const file = ctx.request.files.file;
        // console.log(file);
        const workbook = XLSX.readFile(file.filepath);
        const sheet_name_list = workbook.SheetNames;
        const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        // console.log(xlData);

        const FFMMsData = [];
        for (let i = 1; i < xlData.length; i++) {
            const rowData = xlData[i];
            const runValue = rowData['RUN'];

            if (!runValue) {
                continue;
            }

            const existingFFMM = await ctx.orm.FFMMs.findOne({ where: { run: runValue } });

            if (!existingFFMM) {
                // Si no existe, insertar el nuevo registro
                const truncateDecimals = (value) => Math.trunc(value * 100) / 100;

                const createdFFMM = await ctx.orm.FFMMs.create({
                    name: rowData['Nombre Fondo'],
                    agf: rowData['Administradora'],
                    run: runValue,
                    series: rowData['Serie'],
                    money: rowData['Moneda'],
                    type: rowData['Tipo de Fondo'],
                    category: rowData['Categoria'],
                    monthly: truncateDecimals(parseFloat(rowData['Mensual'])),
                    ytd: truncateDecimals(parseFloat(rowData['YTD'])),
                    yearly: truncateDecimals(parseFloat(rowData['12 meses'])),
                    rescueability: rowData['tiempo de rescate'],
                    riskLevel: rowData['Nivel de riesgo'],
                    bylawLink: rowData['Link reglamento'],
                    dataSheetLink: rowData['Link ficha'],
                    invertLink: rowData['Link invertir'],
                });

                FFMMsData.push(createdFFMM);
            } else {
                // Si existe, comparar cada atributo antes de actualizar
                let shouldUpdate = false;

                Object.keys(rowData).forEach(key => {
                    const mappedKey = mapKey(key);
                    if (existingFFMM[mappedKey] !== rowData[key]) {
                        shouldUpdate = true;
                    }
                });

                const truncateDecimals = (value) => Math.trunc(value * 100) / 100;
                if (shouldUpdate) {
                    await existingFFMM.update({
                        name: rowData['Nombre Fondo'],
                        agf: rowData['Administradora'],
                        series: rowData['Serie'],
                        money: rowData['Moneda'],
                        type: rowData['Tipo de Fondo'],
                        category: rowData['Categoria'],
                        monthly: truncateDecimals(parseFloat(rowData['Mensual'])),
                        ytd: truncateDecimals(parseFloat(rowData['YTD'])),
                        yearly: truncateDecimals(parseFloat(rowData['12 meses'])),
                        rescueability: rowData['tiempo de rescate'],
                        riskLevel: rowData['Nivel de riesgo'],
                        bylawLink: rowData['Link reglamento'],
                        dataSheetLink: rowData['Link ficha'],
                        invertLink: rowData['Link invertir'],
                    });
                    FFMMsData.push(existingFFMM);
                } else {
                    FFMMsData.push(existingFFMM);
                }
            }
        }
        ctx.body = { FFMMs: FFMMsData.map(ffmm => ffmm.toJSON()) };
        ctx.status = 201;
    } catch (error) {
        console.error("Error handling file upload:", error);
        ctx.throw(500, error);
    }
});

function mapKey(key) {
    const keyMappings = {
        'Nombre Fondo': 'name',
        'Administradora': 'agf',
        'Serie': 'series',
        'Moneda': 'money',
        'Tipo de Fondo': 'type',
        'Categoria': 'category',
        'Mensual': 'monthly',
        'YTD': 'ytd',
        '12 meses': 'yearly',
        'tiempo de rescate': 'rescueability',
        'Nivel de riesgo': 'riskLevel',
        'Link reglamento': 'bylawLink',
        'Link ficha': 'dataSheetLink',
        'Link invertir': 'invertLink',
    };
    return keyMappings[key] || key;
}


module.exports = router;
