
import './style.css'


function Login() {


  return (
    <div className='container'>
      <form>
        <h1>Gerenciador de estoque</h1>
        <input name='email' type='text'/>
        <input name='senha' type='text'/>
        <button type='button'>Entrar</button>
      </form>
    </div>
  )
}

export default Login
