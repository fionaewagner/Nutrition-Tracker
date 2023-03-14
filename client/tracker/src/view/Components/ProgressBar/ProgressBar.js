import './ProgressBar.css'

const ProgressBar = ({bgcolor,progress,height,label}) => {
     
    const outer = {
        height: height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 5
      }
      
      const inner = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
        textAlign: 'right',
      }
      
      const label2 = {
        padding: 10,
        color: 'black',
        fontSize: 10,
        fontWeight: 600
      }
        
    return (
    <div style={outer}>
      <div style={inner}/>
      <p className='pbar-label'>{label + "g"}</p>
    </div>
    )
}
  
export default ProgressBar;