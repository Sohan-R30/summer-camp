

const ClassesName = ({data}) => {
    console.log(data?.storedClass?.className)
    return (
        <p>Classes Name : {data?.storedClass?.className}</p>
    );
};

export default ClassesName;