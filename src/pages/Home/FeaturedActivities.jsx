import { Typewriter } from 'react-simple-typewriter'


const FeaturedActivity = () => {
    const sportsTournamentStats = {
        participants: 150,
        sports: 4,
        tournaments: 8,
        winners: 16,
    };

    const adventureChallengeStats = {
        challenges: 12,
        participants: 100,
        successRate: '85%',
    };

    return (
        <div className='my-20'>
            <div className="text-4xl text-center font-bold mb-10">
                <h3>
                    <Typewriter
                        words={['Our', 'Featured', 'Activity', 'Here']}
                        loop={true}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h3>
            </div>
            <div className="bg-primaryColor py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Sports Tournaments</h3>
                        <p className="mt-4 text-lg sm:text-xl text-gray-600">Compete against other participants in exciting sports tournaments throughout the summer camp. Showcase your skills and teamwork in sports like soccer, basketball, tennis, and more.</p>
                        <ul className="mt-6 text-lg text-gray-600 flex gap-5 sm:gap-10 flex-wrap justify-center">
                            <li className='bg-[#38ecd4] font-bold text-slate-600 py-2 px-3 -lg rounded-md'>
                                <span className="font-bold">{sportsTournamentStats.participants}</span> Participants
                            </li>
                            <li className='bg-[#38ecd4] font-bold text-slate-600 py-2 px-3 -lg rounded-md'>
                                <span className="font-bold">{sportsTournamentStats.sports}</span> Sports
                            </li>
                            <li className='bg-[#38ecd4] font-bold text-slate-600 py-2 px-3 -lg rounded-md'>
                                <span className="font-bold">{sportsTournamentStats.tournaments}</span> Tournaments
                            </li>
                            <li className='bg-[#38ecd4] font-bold text-slate-600 py-2 px-3 -lg rounded-md'>
                                <span className="font-bold">{sportsTournamentStats.winners}</span> Winners
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="text-center">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Adventure Challenges</h3>
                        <p className="mt-4 text-lg sm:text-xl text-gray-600">Embark on thrilling outdoor adventure challenges during the summer camp. Conquer rock climbing, hiking, zip-lining, and obstacle courses to push your limits and have an unforgettable experience.</p>
                        <ul className="mt-6 text-lg text-gray-600 flex gap-5 sm:gap-10 flex-wrap justify-center">
                            <li className='bg-[#38ecd4] font-bold text-slate-600 py-2 px-3 -lg rounded-md'>
                                <span className="font-bold">{adventureChallengeStats.challenges}</span> Challenges
                            </li>
                            <li className='bg-[#38ecd4] font-bold text-slate-600 py-2 px-3 -lg rounded-md'>
                                <span className="font-bold">{adventureChallengeStats.participants}</span> Participants
                            </li >
                            <li className='bg-[#38ecd4] font-bold text-slate-600 py-2 px-3 -lg rounded-md'>
                                <span className="font-bold">{adventureChallengeStats.successRate}</span> Success Rate
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedActivity;
