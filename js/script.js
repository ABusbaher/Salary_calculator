$( function() {
    $('#glavnaForma').hide();
    $('#result').hide();
    $('#wraper').hide();
    $('#demo2').datetimepicker({
        date: new Date(),
        viewMode: 'YMD',
    });
    $('.dateForm').submit(function(event){
        event.preventDefault();
        var d = new Date();
        var day = d.getDate();
        var currentMonthTotal = parseInt(d.getMonth()+1) + 12 * parseInt(d.getFullYear());
        var beggingWorkMonthTotal = parseInt($('#mesec').val()) + parseInt($('#godina').val());


        $('#glavnaForma').show();
        $('#wraper').show();
        if(((day < 10) && (currentMonthTotal - beggingWorkMonthTotal < 5)) ||
        ((day >= 10) && (currentMonthTotal - beggingWorkMonthTotal < 4))) {
            //$("#ua").attr("disabled", true);
            $("#preporuka").attr("disabled", true);
          //  $("#presenceB").attr("disabled", true);
        }
        var totalDays =  parseInt($("#mesecPlate").val());
        //console.log(totalDays);
        $('.dateForm').hide();

        $('#glavnaForma').submit(function(event) {
            event.preventDefault();
            $('#result').show();
            $('#wraper').hide();
            var profesionalBonusValue = parseFloat($('#pozicija').val());
            var individualBonusValue = parseFloat($("#indBonus").val());
            var monthDays = $('#mesec').val();
            var basicHourlySalary = 193.79;
            var sickLeaveDemotion = 0.65;
            var publicHolidayBonus = 2.1;
            var fpl = 0.6;
            var overtimeBonus = 1.26;
            var overtimeNightBonus = 1.52;
            var overtimeHolidayBonus = 2.36;
            var recourse = 2083.33;
            var nutriotionBonus = 4835;
          //  var disciplinary = 3835;
            var profesionalBonus = 0;
            var individualBonus = 0;
            var presenceBonus = 0;
            var recommendationBonus = 0;

            if($('#preporuka').is(':checked')){
                    recommendationBonus = 6134;
            }

            var workDaysValue = parseInt($("#radniDani").val());
            var workingDays = 8 * basicHourlySalary * workDaysValue;
            var nwValue = parseInt($("#radNocu").val());
            var nighWork = 8 * basicHourlySalary * overtimeBonus * nwValue;
            var overtimeHours = parseInt($("#prekovremeno").val());
            var overtimeWork = basicHourlySalary * overtimeBonus * overtimeHours;

            var ovrNight = parseInt($("#nightOvertime").val());
            var overtimeNightWork = ovrNight * overtimeNightBonus * basicHourlySalary;
            //console.log(overtimeNightWork);

            var ovrHoliday = parseInt($("#holidayOvertime").val());
            var overtimeHolidayWork = ovrHoliday * overtimeHolidayBonus * basicHourlySalary;
            //console.log(ovrHoliday);

            var pubHolValue = parseInt($("#radPraznikom").val());
            var publicHolidayWork = 8 * basicHourlySalary * publicHolidayBonus * pubHolValue;
            var slValue = parseInt($("#bolovanje").val());
            var sickLeave = 8 * basicHourlySalary * sickLeaveDemotion * slValue;
            var fplValue = parseInt($("#fpl").val());
            var sumFpl = 8 * basicHourlySalary * fpl * fplValue;
            var fullPaidValue = parseInt($("#100posto").val());
            var fullPaid = 8 * basicHourlySalary * fullPaidValue;
            var ulValue = parseInt($("#ul").val());

            var topliObrok = (nutriotionBonus/totalDays) * (workDaysValue + nwValue + pubHolValue);
            //var discBonus = 0;

          /*  if( ulValue == 0 && slValue == 0 && $('#ua').is(':checked')){
                var discBonus = (presenceBonus/totalDays) * (workDaysValue + nwValue + pubHolValue);
            }*/

            if($('#presenceB').is(':checked') && $('#ua').is(':checked')  && slValue < 1 && ulValue < 1){
                    presenceBonus = 7132.67;
            }

            var totalWorkOnly =
                workingDays + nighWork +
                overtimeWork + publicHolidayWork +
                overtimeHolidayWork + overtimeNightWork;

            if(((day < 10) && (currentMonthTotal - beggingWorkMonthTotal > 4)) ||
                ((day >= 10) && (currentMonthTotal - beggingWorkMonthTotal > 3))) {
                individualBonus = totalWorkOnly * individualBonusValue;
                profesionalBonus = totalWorkOnly * profesionalBonusValue;

                if(!$('#ua').is(':checked')) {
                  profesionalBonus = 0;
                  individualBonus = 0;
                  presenceBonus = 0;
                }

                if(!$('#ua').is(':checked') || ulValue > 2 || slValue > 2) {
                //if (ulValue > 2 || slValue > 2) {
                    individualBonus = 0;
                    presenceBonus = 0;
                }

            }else{
                individualBonus = 0;
                profesionalBonus = 0;
            }


            var totalBruto =
                totalWorkOnly + sickLeave
                + sumFpl + fullPaid
                + recourse + nutriotionBonus
                + individualBonus + profesionalBonus
                + presenceBonus+recommendationBonus;

            var totalNeto = (totalBruto * 0.701) + 1500;

            $('#glavnaForma').hide();
            $('.uputsvo').hide();
            $('#result').html(
                '<div style="padding-boottom:20px;">'+
                    '<h2 class="text-center">Ваша очекивана плата</h2>' +
                    '<p class="alignleft">Рад у првој и другој смени:</p><p class="alignright">' + parseFloat(workingDays).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Ноћни рад:</p><p class="alignright">' + parseFloat(nighWork).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Прековремени рад:</p><p class="alignright">' + parseFloat(overtimeWork).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Рад на државни празник или рад на своју славу:</p><p class="alignright">' + parseFloat(publicHolidayWork).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +

                    '<p class="alignleft">Прековремени ноћни рад:</p><p class="alignright">' + parseFloat(overtimeNightWork).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Прековремени рад на државни празник:</p><p class="alignright">' + parseFloat(overtimeHolidayWork).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +

                    '<p class="alignleft">Топли оброк:</p><p class="alignright">' + parseFloat(topliObrok).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Регрес:</p><p class="alignright">' + 2083.33 +'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Боловање:</p><p class="alignright">' + parseFloat(sickLeave).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Отказана смена:</p><p class="alignright">' + parseFloat(sumFpl).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Годишњи одмор, слава, плаћено одсуство,државни празник:</p><p class="alignright">' + parseFloat(fullPaid).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Неплаћено одсуство:</p><p class="alignright">' + 0 + '</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Професионални бонус:</p><p class="alignright">' + parseFloat(profesionalBonus).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Индивидуални бонус:</p><p class="alignright">' + parseFloat(individualBonus).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Бонус за присутност:</p><p class="alignright">' + parseFloat(presenceBonus).toFixed(2)+'</p>' +
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft">Бонус за препоруке:</p><p class="alignright">' + parseFloat(recommendationBonus).toFixed(2) +
                    '</p>' +
                    '<div style="clear: both;"></div>' +
                    '<hr style="border-top: 3px double #8c8b8b;">' +
                    '<p class="alignleft"><strong>Укупна бруто зарада:</p><p class="alignright">' + parseFloat(totalBruto).toFixed(2)+' динара<strong></p>'+
                    '<div style="clear: both;"></div>' +
                    '<p class="alignleft"><strong>Укупна нето зарада износи:</p><p class="alignright">' + parseFloat(totalNeto).toFixed(2)+' динара<strong></p><div>' +
                    '<div style="clear: both;"></div>' +
                '</div>' +
                '<div class="text-center"><a href="javascript:window.location.href=window.location.href"><button class="bigButton">Рачунај поново</button></a></div>');
        });
    });
});
