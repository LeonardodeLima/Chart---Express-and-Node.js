window.onload = () => { new MyChart(); };

class MyChart{

    constructor(){
        this.iniciaElementos();
        this.carregaDados().then( () => this.render());
    }

    iniciaElementos(){
        this.cadastrar = document.querySelector("#cadastrar");
        this.cadastrar.addEventListener('click',() => {
            this.cadastrarCliente()
            .then(() => this.carregaDados()
            .then(() => this.render()));
        });

        this.chartSexoElement = document.querySelector("#sexoChart");
        this.chartSexo   = this.criarChartSexo();

        this.chartDataElement = document.querySelector("#dataChart");
        this.chartData   = this.criarChartData();

        this.chartRegiaoElement = document.querySelector("#regiaoChart");
        this.chartRegiao   = this.criarChartRegiao();
    }
    
    cadastrarCliente(){
        
        const nome = document.querySelector("#nome");
        const sexo = document.querySelector('input[name="sexo"]:checked');
        const estado = document.querySelector("#estado").value;

           //horario do servidor 
           const tzoffset = (new Date()).getTimezoneOffset() * 60000
           const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
   
        const dados = {
            nome: nome.value,
            sexo: sexo.dataset.value,
            date: localISOTime,
            estado: estado
        }

        console.log(dados)
       return axios
        .post("/save", dados)
        .then(response => {
                console.log(response);
            })
            .catch(error => {
              console.log("Erro ao tentar gravar dados." ,error);
        });
    }

    carregaDados(){
     return  axios
        .get("/all")
        .then(response => {
                //console.log(response.data);
                this.prepararDados(response.data);
                this.render();
            })
            .catch(error => {
              console.log("Erro ao tentar obter dados." ,error);
        });  
    }

    prepararDados(dados){

        this.dadosSexo =[
            dados.filter(dado => dado.sexo == 1).length,
            dados.filter(dado => dado.sexo == 2).length
        ];


        this.labelData = {};
        dados.forEach(element => {
            const dataFormatada = new Date(element.date).toISOString().split("T")[0];
            this.labelData[dataFormatada] = this.labelData[dataFormatada] +1 || 1;
        });

        this.labelRegiao = {};
        dados.forEach(element => {
            const estados = element.estado;
            this.labelRegiao[estados] = this.labelRegiao[estados] +1 || 1;
        });

        //console.log(this.labelRegiao);
        
    }

    render(){
        //iserir
        this.chartSexo.data.datasets[0].data = this.dadosSexo;
        console.log(this.labelRegiao);

        this.chartData.data.labels =  Object.keys(this.labelData);
        this.chartData.data.datasets[0].data = Object.values(this.labelData);
        
        this.chartRegiao.data.labels =  Object.keys(this.labelRegiao);
        this.chartRegiao.data.datasets[0].data = Object.values(this.labelRegiao);
        
        
        //atualizar
        this.chartSexo.update();
        this.chartData.update();
        this.chartRegiao.update();
    }

    criarChartSexo(){

     return new Chart(this.chartSexoElement, {
        type: 'bar',
        data: {
                labels: ["Homem", "Mulher"],
                datasets: [{
                    label: 'Total por sexo',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

    criarChartData(){

        return new Chart(this.chartDataElement, {
           type: 'line',
           data: {
                   labels: [],
                   datasets: [{
                       label: 'Total',
                       data: [],
                       borderColor: ['rgba(255,99,132,1)'],
                       borderWidth: 1
                   }]
               },
               options: {
                   scales: {
                       yAxes: [{
                           ticks: {
                               beginAtZero:true
                           }
                       }]
                   }
               }
           });
       }
    
    criarChartRegiao(){

        return new Chart(this.chartRegiaoElement, {
            type: 'polarArea',
            data: {
              labels: [],
              datasets: [
                {
                  label: "Por região",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: []
                }
              ]
            },
               options: {
                   scales: {
                       yAxes: [{
                           ticks: {
                               beginAtZero:true
                           }
                       }]
                   }
               }
           });
       }

      
       
}