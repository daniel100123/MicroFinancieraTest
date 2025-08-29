function calculateId() {
  console.log("calculateId called");
  var credito = $('#credito1').val();
  if (!isNaN(credito)) {
    var ahorroCapital = 0
    var interes = 0
    var iva = 0
    var base = credito * 0.10;
    var ahorrosemanal = credito * 0.0075;
    var pagoTotalSemanal = (credito / 16) + (credito * 0.015) + (credito * 0.0024) + ahorrosemanal;
    var ahorroTotal = (base + (ahorrosemanal))
    ahorroCapital = ahorroCapital + (credito / 16);
    interes = credito * 0.015;
    iva = credito * 0.0024;

    //primer invercion
    $("#pagoCapital").html(ToMoney(ahorroCapital, 2));
    $("#interes").html(ToMoney(interes, 2));
    $("#iva").html(ToMoney(iva, 2));
    $("#ahorro").html(ToMoney(ahorrosemanal, 2));
    $("#base").html(ToMoney(base, 2));
    $('#pagoSemanal').html(ToMoney((pagoTotalSemanal), 2));
    $('#ganancias1').html(ToMoney((pagoTotalSemanal) - ahorroTotal, 2));
    var total = (pagoTotalSemanal * 16) - (/*base +*/ (ahorrosemanal * 16))
    $("#total").html(ToMoney(total, 2));

    //agrgar la base a la otra fila
    $('#credito2').html(ToMoney(base, 2));



    //segunda inversion
    //Tercera inversion
    $('#credito3').html(ToMoney(pagoTotalSemanal, 2));

    var ahorroCapital3 = 0
    var interes3 = 0
    var iva3 = 0
    var base3 = 0;
    var ahorrosemanal3 = 0;
    var pagoTotalSemanal3 = 0;

    base3 = pagoTotalSemanal * 0.10;
    ahorroCapital3 = (pagoTotalSemanal / 16);
    interes3 = pagoTotalSemanal * 0.015;
    iva3 = pagoTotalSemanal * 0.0024;
    ahorrosemanal3 = pagoTotalSemanal * 0.0075;
    pagoTotalSemanal3 = ahorroCapital3 + interes3 + iva3 + ahorrosemanal3;

    $("#pagoCapital3").html(ToMoney(ahorroCapital3, 2));
    $("#interes3").html(ToMoney(interes3, 2));
    $("#iva3").html(ToMoney(iva3, 2));
    $("#ahorro3").html(ToMoney(ahorrosemanal3, 2));
    $('#pagoSemanal3').html(ToMoney((pagoTotalSemanal3), 2));
    $("#base3").html(ToMoney(base3, 2));
    var total3 = (pagoTotalSemanal3 * 16) - (/*base3 +*/ (ahorrosemanal3 * 16))
    $("#total3").html(ToMoney(total3, 2));
    //Cuarta inversion
    $('#credito4').html(ToMoney(pagoTotalSemanal + pagoTotalSemanal3 + base3, 2));
    var ahorroCapital4 = 0
    var interes4 = 0
    var iva4 = 0
    var base4 = 0;
    var ahorrosemanal4 = 0;
    var pagoTotalSemanal4 = 0;

    base4 = (pagoTotalSemanal + pagoTotalSemanal3 + base3) * 0.10;
    ahorroCapital4 = ((pagoTotalSemanal + pagoTotalSemanal3 + base3) / 16);
    interes4 = (pagoTotalSemanal + pagoTotalSemanal3 + base3) * 0.015;
    iva4 = (pagoTotalSemanal + pagoTotalSemanal3 + base3) * 0.0024;
    ahorrosemanal4 = (pagoTotalSemanal + pagoTotalSemanal3 + base3) * 0.0075;
    pagoTotalSemanal4 = ahorroCapital4 + interes4 + iva4 + ahorrosemanal4;

    $("#pagoCapital4").html(ToMoney(ahorroCapital4, 2));
    $("#interes4").html(ToMoney(interes4, 2));
    $("#iva4").html(ToMoney(iva4, 2));
    $("#ahorro4").html(ToMoney(ahorrosemanal4, 2));
    $('#pagoSemanal4').html(ToMoney((pagoTotalSemanal4), 2));
    $("#base4").html(ToMoney(base4, 2));
    var total4 = (pagoTotalSemanal4 * 16) - (/*base4 +*/ (ahorrosemanal4 * 16))
    $("#total4").html(ToMoney(total4, 2));

    //Quinta inversion
    var prestamo = 0;
    var total5 = 0;
    prestamo = pagoTotalSemanal + pagoTotalSemanal3 + pagoTotalSemanal4 + base4;
    $('#credito5').html(ToMoney(prestamo, 2));
    var ahorroCapital5 = 0
    var interes5 = 0
    var iva5 = 0
    var base5 = 0;
    var ahorrosemanal5 = 0;
    var pagoTotalSemanal5 = 0;

    base5 = (prestamo) * 0.10;
    ahorroCapital5 = ((prestamo) / 16);
    interes5 = (prestamo) * 0.015;
    iva5 = (prestamo) * 0.0024;
    ahorrosemanal5 = (prestamo) * 0.0075;
    pagoTotalSemanal5 = ahorroCapital5 + interes5 + iva5 + ahorrosemanal5;

    $("#pagoCapital5").html(ToMoney(ahorroCapital5, 2));
    $("#interes5").html(ToMoney(interes5, 2));
    $("#iva5").html(ToMoney(iva5, 2));
    $("#ahorro5").html(ToMoney(ahorrosemanal5, 2));
    $('#pagoSemanal5').html(ToMoney((pagoTotalSemanal5), 2));
    $("#base5").html(ToMoney(base5, 2));
    total5 = ((pagoTotalSemanal5 * 16) - (/*base5 +*/ (ahorrosemanal5 * 16)));
    $("#total5").html(ToMoney(total5, 2));

    //sexta inversion
    var prestamo2 = 0;
    var total6 = 0;
    prestamo2 = pagoTotalSemanal + pagoTotalSemanal3 + pagoTotalSemanal4 + pagoTotalSemanal5 + base5;
    $('#credito6').html(ToMoney(prestamo2, 2));
    var ahorroCapital6 = 0
    var interes6 = 0
    var iva6 = 0
    var base6 = 0;
    var ahorrosemanal6 = 0;
    var pagoTotalSemanal6 = 0;

    base6 = (prestamo2) * 0.10;
    ahorroCapital6 = ((prestamo2) / 16);
    interes6 = (prestamo2) * 0.015;
    iva6 = (prestamo2) * 0.0024;
    ahorrosemanal6 = (prestamo2) * 0.0075;
    pagoTotalSemanal6 = ahorroCapital6 + interes6 + iva6 + ahorrosemanal6;

    $("#pagoCapital6").html(ToMoney(ahorroCapital6, 2));
    $("#interes6").html(ToMoney(interes6, 2));
    $("#iva6").html(ToMoney(iva6, 2));
    $("#ahorro6").html(ToMoney(ahorrosemanal6, 2));
    $('#pagoSemanal6').html(ToMoney((pagoTotalSemanal6), 2));
    $("#base6").html(ToMoney(base6, 2));
    total6 = ((pagoTotalSemanal6 * 16) - (/*base6 +*/ (ahorrosemanal6 * 16)));
    $("#total6").html(ToMoney(total6, 2));

    //septima inversion
    var prestamo3 = 0;
    var total7 = 0;
    prestamo3 = base;
    $('#credito7').html(ToMoney(prestamo3, 2));
    var ahorroCapital7 = 0
    var interes7 = 0
    var iva7 = 0
    var base7 = 0;
    var ahorrosemanal7 = 0;
    var pagoTotalSemanal7 = 0;

    base7 = (prestamo3) * 0.10;
    ahorroCapital7 = ((prestamo3) / 16);
    interes7 = (prestamo3) * 0.015;
    iva7 = (prestamo3) * 0.0024;
    ahorrosemanal7 = (prestamo3) * 0.0075;
    pagoTotalSemanal7 = ahorroCapital7 + interes7 + iva7 + ahorrosemanal7;

    $("#pagoCapital7").html(ToMoney(ahorroCapital7, 2));
    $("#interes7").html(ToMoney(interes7, 2));
    $("#iva7").html(ToMoney(iva7, 2));
    $("#ahorro7").html(ToMoney(ahorrosemanal7, 2));
    $('#pagoSemanal7').html(ToMoney((pagoTotalSemanal7), 2));
    $("#base7").html(ToMoney(base7, 2));
    total7 = ((pagoTotalSemanal7 * 16) - (/*base7 +*/ (ahorrosemanal7 * 16)));
    $("#total7").html(ToMoney(total7, 2));

    //Octaba INversion
    var prestamo4 = 0;
    var total8 = 0;
    prestamo4 = base7;
    $('#credito8').html(ToMoney(prestamo4, 2));
    var ahorroCapital8 = 0;
    var interes8 = 0;
    var iva8 = 0;
    var base8 = 0;
    var ahorrosemanal8 = 0;
    var pagoTotalSemanal8 = 0;

    base8 = (prestamo4) * 0.10;
    ahorroCapital8 = ((prestamo4) / 16);
    interes8 = (prestamo4) * 0.015;
    iva8 = (prestamo4) * 0.0024;
    ahorrosemanal8 = (prestamo4) * 0.0075;
    pagoTotalSemanal8 = ahorroCapital8 + interes8 + iva8 + ahorrosemanal8;

    $("#pagoCapital8").html(ToMoney(ahorroCapital8, 2));
    $("#interes8").html(ToMoney(interes8, 2));
    $("#iva8").html(ToMoney(iva8, 2));
    $("#ahorro8").html(ToMoney(ahorrosemanal8, 2));
    $('#pagoSemanal8').html(ToMoney((pagoTotalSemanal8), 2));
    $("#base8").html(ToMoney(base8, 2));
    total8 = ((pagoTotalSemanal8 * 16) - (/*base8 +*/ (ahorrosemanal8 * 16)));
    $("#total8").html(ToMoney(total8, 2));

    var bases = total7 + total8;
    var totalCiclo = ((total3 + total4 + total5 + total6) * 4);
    var totalAnio = totalCiclo * 3;
    $("#totalCiclo").html(ToMoney(totalCiclo + total + bases, 2));
    $("#totalAnio").html(ToMoney(totalAnio + (total * 3) + (bases *3), 2));

  }
}