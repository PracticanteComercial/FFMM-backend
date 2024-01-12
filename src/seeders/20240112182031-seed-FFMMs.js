module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('FFMMs', [
      {
        name: 'Fondo Mutuo 1',
        agf: "Admin 1",
        run: "9999-9",
        series: "A",
        money:"Pesos (CLP)",
        type:"Acciones", 
        monthly: "10.3%",
        ytd: "2.3%",
        yearly: "70.3%",
        rescueability: "menor de 5 días",
        rickLevel: "Alto",
        bylawLink: "https://www.google.com",
        dataSheetLink: "https://www.google.com",
        invertLink: "https://www.google.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]),
  down: (queryInterface) =>
    queryInterface.bulkDelete('FFMMs', null, {}),
};