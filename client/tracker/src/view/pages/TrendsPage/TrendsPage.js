import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card } from "reactstrap";
import { getDiaries } from "../../../controller/actions/diary";
import { selectAllDiaries } from "../../../controller/redux/diarySlice";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    BarElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line, Bar } from 'react-chartjs-2';
  import Loading from "../../Components/Loading/Loading";
  import './TrendsPage.css'
import Header from "../../Header/Header";
const TrendsPage=()=>{

    const diaries = useSelector(selectAllDiaries);

    const day = new Date().getDate(); 
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    let weekOfDays = [];
    for(let i = 0;i<7;i++){
      const newDate = month + "a" + (day - i) + "a" + year
      weekOfDays.push(newDate)
    }
    const weekOfCals = diaries.filter((el)=>{
      if(weekOfDays.includes(el.diaryDate)){
        return el
      }
    });
    let finalCalorieWeek=[];
    let finalCarbWeek=[];
    let finalFatWeek=[];
    let finalProteinWeek=[];
    let finalWeightWeek=[];

    let yoMomCals = [];

    weekOfDays.forEach((el)=>{
      let found = false;
      weekOfCals.forEach((el2)=>{
        if(el === el2.diaryDate){
          finalCalorieWeek.push(el2.totalCals)
          finalCarbWeek.push(el2.totalCarbs)
          finalFatWeek.push(el2.totalFat)
          finalProteinWeek.push(el2.totalProtien)
          finalWeightWeek.push(el2.weight)
          found = true;
          return;
        }
      })
      if(!found){
        finalCalorieWeek.push(0)
        finalCarbWeek.push(0)
        finalFatWeek.push(0)
        finalProteinWeek.push(0)
        finalWeightWeek.push("No Data for this date.")
      }
      

    })
    console.log(yoMomCals)



    

    console.log(weekOfCals)
    
    const diariesForAWeek = diaries.length > 7 ? true : false
    const tempDiaryList = diariesForAWeek ? diaries.slice(diaries.length - 7) : diaries

    


    
    
    const pastWeekDiariesCals = diariesForAWeek ? diaries.slice(diaries.length - 7).map((el)=>el.totalCals) : diaries.map((el)=>el.totalCals)
    const pastWeekDiariesCarbs = diariesForAWeek ? diaries.slice(diaries.length - 7).map((el)=>el.totalCarbs) : diaries.map((el)=>el.totalCarbs)
    const pastWeekDiariesFat = diariesForAWeek ? diaries.slice(diaries.length - 7).map((el)=>el.totalFat) : diaries.map((el)=>el.totalFat)
    const pastWeekDiariesProtein = diariesForAWeek ? diaries.slice(diaries.length - 7).map((el)=>el.totalProtien) : diaries.map((el)=>el.totalProtien)
    const pastWeekDiariesWeight = diariesForAWeek ? diaries.slice(diaries.length - 7).map((el)=>el.weight) : diaries.map((el)=>el.weight)
    
    const dispatch = useDispatch();
    const listAllCals = diaries.map((d)=>d.totalCals)
    useEffect(()=>{
        getDiaries(dispatch);
     },[]);

     ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Filler,
        Tooltip,
        Legend
      );
      
       const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
      };
      
      const labels = weekOfDays.map((el)=>el.replace(/a/g, "/")) ;
      
      
        const data = {
          labels,
        datasets: [
          {
            fill: true,
            label: 'Daily Calorie Count',
            data: finalCalorieWeek,
            borderColor: '#aadaa7',
            backgroundColor: '#B2E3AF',
          }
        ],
      };

      const macroData = 
      {
        labels,
        datasets: [
          {
            label: 'Daily Carb Count (g)',
            data: finalCarbWeek,
            borderColor: '#cdf0bb',
            backgroundColor: '#D6FAC3',
          },
          {
            label: 'Daily Fat Count (g)',
            data: finalFatWeek,
            borderColor: '#bacee5',
            backgroundColor: '#bacee5',
          },
          {
            label: 'Daily Protien Count (g)',
            data: finalProteinWeek,
            borderColor: '#ede3cd',
            backgroundColor: '#FAEFD7',
          }

        ],
      };


      const weightData = 
      {
        labels,
        datasets: [
          {
            label: 'Daily Weight (lbs)',
            data: finalWeightWeek,
            borderColor: '#dff6c6',
            backgroundColor: '#E9FFCF',
          }
        ],
      };

    

     if(!pastWeekDiariesCals){
      return(
        <>
          <Header/>
          <Loading/>
        </>
      )

     }
      return (
        <>
        <Header/>
        <Container>
            <Row className='home-page-text mb-3'>
                    <Col>
                        <h2 className='text-center color-tan'>My Trends</h2>
                    </Col>
            </Row>
            
            <Row className="mb-2">
                <Col >
                  <Card className="p-3 text-center">
                      <h5 className="color-gray trends-card-text">Calories</h5>
                      <Line  options={options} data={data}/>
                  </Card>
                </Col>
              </Row>


                <Row>
                  <Col xs='6'>
                    <Card className="p-3 text-center">
                      <h5 className="color-gray trends-card-text">Macro Nutients</h5>
                        <Line options={options} data={macroData}/>
                        
                    </Card>
                  </Col>
                  <Col xs='6'>
                    <Card className="p-3 text-center">
                      <h5 className="color-gray trends-card-text">Weight</h5>
                        <Bar options={options} data={weightData}/>
                    </Card>
                  </Col>
                </Row>
        
        </Container>
        </>
        
      );
    
    

}

export default TrendsPage