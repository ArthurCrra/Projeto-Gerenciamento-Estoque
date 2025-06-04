
import './style.css'


export function Dashboard() {


  return (
    <div className='container'>
      <form>
        <h1>Gerenciador de estoque</h1>
        <input name='email' type='text' placeholder='email@exemplo.com'/>
        <input name='senha' type='password' placeholder='******'/>
        <button type='button'>Entrar</button>
      </form>
    </div>
  )
}

