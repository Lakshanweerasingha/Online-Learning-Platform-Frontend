const handleDeleteEnrollment = async (enrollmentId) => {
    try {
      await axios.delete(`/enrollments/${enrollmentId}`);
      setEnrollments(enrollments.filter((enrollment) => enrollment.id !== enrollmentId));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };
  