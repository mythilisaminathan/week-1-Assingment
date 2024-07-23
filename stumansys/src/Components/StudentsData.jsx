import React from 'react'
import '../Components/studentdata'

const StudentsData = () => {
  return (
    <div>
      <form>

      <h2>Student Details Form</h2>
    <form>
       
        <div class="form-group">
            <label for="studentId">Student ID</label>
            <input type="text" id="studentId" name="studentId" required/>
        </div>
        <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required/>
        </div>
        <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required/>
        </div>
        <div class="form-group">
            <label for="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" required />
        </div>
        <div class="form-group">
            <label for="gender">Gender</label>
            <select id="gender" name="gender" required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>

       
        <div class="form-group">
            <label for="enrollmentDate">Enrollment Date</label>
            <input type="date" id="enrollmentDate" name="enrollmentDate" required/>
        </div>
        <div class="form-group">
            <label for="grade">Current Grade/Year</label>
            <input type="text" id="grade" name="grade" required/>
        </div>
        <div class="form-group">
            <label for="major">Major/Concentration</label>
            <input type="text" id="major" name="major"/>
        </div>

      
        <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" required/>
        </div>
        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" required/>
        </div>
        <div class="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" name="address" required/>
        </div>

        <button type="submit">Submit</button>
    </form>

      </form>
    </div>
  )
}

export default StudentsData
