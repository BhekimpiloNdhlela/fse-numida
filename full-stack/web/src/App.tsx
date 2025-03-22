import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoanList from './components/UserLoanList';
import LoanDetails from './components/LoanDetails';



import AddNewPayment from './components/AddNewPayment'
import NotificationAlert from './components/common/NotificationAlert';
import Loader from './components/common/Loader';
// import UserLoanList from './components/UserLoanList';
import LoanCalculator from './components/LoanCalculator';

function App() {
    return (
        <>
   

        <Router>

            <div className="container mt-5">
                <h1>Loan Management System</h1>
                <Routes>
                    <Route path="/" element={<LoanList />} />
                    <Route path="/loan/:loanId" element={<LoanDetails />} />
                </Routes>
            </div>
        </Router>


        </>
    )
}

export default App




// https://www.davidhu.io/react-spinners/storybook/?path=/docs/clockloader--docs




{/* <NotificationAlert type='primary' message="Hello My name is bhekimpilo ndhlela and I am a cloud engineer"/>
<NotificationAlert type='secondary' message="Hello My name is bhekimpilo ndhlela and I am a cloud engineer"/>
<NotificationAlert type='success' message="Hello My name is bhekimpilo ndhlela and I am a cloud engineer"/>
<NotificationAlert type='danger' message="Hello My name is bhekimpilo ndhlela and I am a cloud engineer"/>
<NotificationAlert type='warning' message="Hello My name is bhekimpilo ndhlela and I am a cloud engineer"/>
<NotificationAlert type='info' message="Hello My name is bhekimpilo ndhlela and I am a cloud engineer"/>
// <Loader loading={false}/>
<AddNewPayment />
<LoanCalculator/>


<LoanList/> */}
