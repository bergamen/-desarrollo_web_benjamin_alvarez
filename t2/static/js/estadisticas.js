// Aquí puede poner su implementación de obtenerDatosBitcoin para hacer PRUEBAS, la solucion se entrega en el markdown

async function obtenerDatosLinea() { // funcion asincrona

  try{
  const response = await fetch('http://127.0.0.1:5000/get-stats-data/linea');
  const datos = await response.json();
  if (!response.ok) {
    throw new Error("Error al conectarse");
  }
  return datos;}
  catch(error){
    console.error('Error al obtener datos de Bitcoin:', error);
    throw error;
  }
}

// desde acá hacia abajo no cambien nada

function procesarDatos(datos) {
  return datos.prices.map(([timestamp, precio]) => {
    const fecha = new Date(timestamp);
    return [fecha.getTime(), precio];
  });
}

async function crearGraficoLinea() {
  try {
    const datos = await obtenerDatosLinea();
    //const precios = procesarDatos(datos);

    console.log(datos);

    const categorias = datos.map(item => item.dia); // eje X: días
    const valores = datos.map(item => item.cantidad_avisos);

    Highcharts.chart('container0', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Avisos por día'
      },
      xAxis: {
        categories: categorias,
        title: {
          text: 'dia'
        }
      },
      yAxis: {
        type:'integer',
        title: {
          text: 'Cantidad de Avisos'
        }
      },
      tooltip: {
        xDateFormat: '%d/%m/%Y',
        shared: true
      },
      series: [{
        name: 'Cantidad',
        data: valores,
        color: '#FF9900'
      }],
      legend: {
        enabled: true
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });

  } catch (error) {
    console.error('Error al crear el gráfico:', error);
    document.getElementById('container').innerHTML = '<p style="color:red;">No se pudieron cargar los datos.</p>';
  }
}

async function obtenerDatosTorta() { // funcion asincrona

  try{
  const response = await fetch("http://127.0.0.1:5000/get-stats-data/torta");
  const datos = await response.json();
  if (!response.ok) {
    throw new Error("Error al conectarse");
  }
  console.log(datos);
  return datos;}
  catch(error){
    console.error('Error al obtener datos:', error);
    throw error;
  }
}


function procesarDatosTorta(datos) {
  return datos.map(([tipo, conteo]) => {
    return [tipo,conteo];
  });
}

async function crearGraficoTorta() {

    try {
    const datos = await obtenerDatosTorta();
    console.log(datos);

    Highcharts.chart('container1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Cantidad de perros contra cantidad de gatos'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Datos',
            colorByPoint: true,
            data: datos
        }]
    });

  } catch (error) {
    console.error('Error al crear el gráfico:', error);
    document.getElementById('container').innerHTML = '<p style="color:red;">No se pudieron cargar los datos.</p>';
  }


   
}


async function crearGraficoBarra()  {
  try {
    const response = await fetch("http://127.0.0.1:5000/get-stats-data/barra");
    if (!response.ok) throw new Error('Error al obtener datos');
    const datos = await response.json();

    const meses = [...new Set(datos.map(d => d.mes))];

    const gatos = meses.map(m => {
      const registro = datos.find(d => d.mes === m && d.tipo === 'gato');
      return registro ? registro.cantidad : 0;
    });

    const perros = meses.map(m => {
      const registro = datos.find(d => d.mes === m && d.tipo === 'perro');
      return registro ? registro.cantidad : 0;
    });

    Highcharts.chart('container2', {
      chart: {
        type: 'column' 
      },
      title: {
        text: 'Avisos de Adopción por Mes y Tipo de Animal'
      },
      xAxis: {
        categories: meses,
        title: { text: 'Mes' }
      },
      yAxis: {
        min: 0,
        title: { text: 'Cantidad de Avisos' },
        allowDecimals: false
      },
      series: [
        {
          name: 'Gatos',
          data: gatos,
          color: '#f39c12'
        },
        {
          name: 'Perros',
          data: perros,
          color: '#3498db'
        }
      ],
      tooltip: {
        shared: true,
        valueSuffix: ' avisos'
      },
      credits: {
        enabled: false
      }
    });

  } catch (error) {
    console.error('Error al generar el gráfico:', error);
  }
}

crearGraficoLinea();
crearGraficoTorta();
crearGraficoBarra();