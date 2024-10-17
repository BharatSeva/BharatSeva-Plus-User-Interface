import "./IndexPage.css"
import { NavLink } from "react-router-dom"
import BharatSevaLogo1 from "../Images_Assests/BharatSevaLogo1.png"
export default function IndexPage() {


    return (
        <>
            <div className="IndexPageContainer DisplayFlexX">
                <h2>Welcome to </h2>
                <div className="IndexNameContainer DisplayFlexX">
                    <img src={BharatSevaLogo1} alt="Bharat Seva+ Logo" />
                    {/* <h1>Bharat Seva+</h1>
                    <p>Empowering Health, Transforming Lives</p> */}
                </div>

                <div className="IndexAboutContainer">
                    <p>Welcome to Bharat Sevaplus, a WebApps that maintain Records (Patient Health Logs), Make Appointments, and support Video-Text* Messages between patient and Healthcare Professional<br />
                        With its user-friendly interface and powerful features, BharatSeva+ becomes your trusted companion for logging records, making appointments, and maintaining comprehensive health records.</p>
                    <p><span className="SpecialTaglineIndex">Effortlessly Log Records :</span>
                        Say goodbye to stacks of paper and scattered medical documents. Bharat Seva+ allows you to conveniently record and store essential health information. From vital signs to medication details, you can effortlessly input and track all your health records in one place. With secure cloud storage, your data remains accessible and safe, giving you peace of mind.</p>
                    <p>Bharat Seva+ acts as your digital health diary, allowing you to maintain comprehensive records of your medical history. Whether it's lab results, vaccination records, or imaging reports, all your essential documents are securely stored in one place. Access your records anytime, anywhere, and easily share them with healthcare professionals when needed, ensuring seamless communication and efficient care.</p>
                    <p><span className="SpecialTaglineIndex">Personalized Health Insights* :</span>
                        Bharat Seva+  goes beyond record-keeping by offering personalized health insights. The app analyzes your health data and provides valuable information, such as trends, patterns, and recommendations. With this knowledge at your fingertips, you can make informed decisions about your well-being, proactively manage your health, and achieve your wellness goals.</p>

                    <p>Embrace the future of healthcare management with Bharat Seva+. Visit Website today! and experience the convenience, efficiency, and peace of mind that comes with having your personal healthcare companion. Take control of your health journey like never before. <br />Bharat Seva+ - Your wellbeing, simplified.</p>
                </div>

                <div className="projectinfo width80vw">
                    <h2>About My Project</h2>

                    <div className="IndexPageAboutApp">
                        <p>This Project Consists of two WebApps : </p>
                        <ul>
                            <a href="https://bharatsevaplus-healthcare.netlify.app" target="_blank" rel="noreferrer">
                                <li>HealthCare InterFace <span className="GoToSitePage">Go to Site</span></li>
                            </a>
                            <a href="https://bharatsevaplus-user.netlify.app" target="_blank" rel="noreferrer">
                                <li>User InterFace <span className="GoToSitePage">Go to Site</span></li>
                            </a>
                        </ul>
                        <p>These Two Apps Works Concurrently to provide services to its User. <br />The <i>BharatSeva HealthCare InterFace</i> is Healthcare Platform that works for
                            HIPs and HIUs, that genrate Health Logs such as Bio-data, Health Records and provide benefits to User/Patients.
                        </p>
                        <p>On the Otherhand <i>BharatSeva User InterFace</i> Provide Services to end-user, normal people, patient whom data would be genrated and records will be Logged!</p>
                    </div>


                    <div className="projectdetails">
                        <p>Some More Details</p>
                        <ul>
                            <li>Check My Blog To know More About this project <a href="https://statesinshorts.blogspot.com/2023/07/Bharatsevaplus.html" target="_blank" rel="noreferrer"><span className="GoToSitePage">Go to My Blog</span></a> or Watch my Demo <a href="https://youtube.com/playlist?list=PLXRQ5AMta2AI_jZlGr0A5owICnGkDpElO" target="_blank" rel="noreferrer"><span className="GoToSitePage">Open Playlist</span></a></li>
                            <li>This is MERN + Firebase Stack project Developed and Managed by <a href="https://captaintron.github.io/MyPortfolio/" target="_blank" rel="noreferrer">Vaibhav Yadav <span className="GoToSitePage">Portfolio Link</span></a>.</li>
                            <li>This Project took almost 3 months to complete.</li>
                            <li>The Main Purpose behind this project is to test my Web-Development Skills and take it to Next Level like never before !</li>
                            <li>Both these Websites Hosted On <a href="https://www.netlify.com/" target="_blank" rel="noreferrer">Netlify <span className="GoToSitePage">Open</span></a></li>
                            <li>REST API Hosted at <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer">AWS <span className="GoToSitePage">Open</span></a></li>
                            <li>More Features Will Be Added in Future Updates. Some of them are : Video-Text Messages, Mobile View etc..</li>
                            <li>If You have any queries or feedback you can simply <a href="mailto:21vaibhav11@gmail.com"><span className="GoToSitePageMailMe">Mail</span></a> Me.</li>
                        </ul>
                        <h3>Thank You for Your Interest 💗</h3>

                    </div>
                </div>

                <p className="infomessage">*Upcoming in Future updates</p>

                <NavLink to="/user/login"><div className="gotologinpageIndex" >
                    <p>Proceed to User Login Page</p>
                </div></NavLink>
            </div>
        </>
    )
}