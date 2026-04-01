/** Shared prospect profiles + detail panel (All Players, Dashboard). */
var currentPlayerName = 'Jalen Rivera';
var currentNotesKey = 'Rivera';
const playerNotes = {
  Rivera: [
    { id:1, author:'Coach Williams', date:'Mar 28, 2026', text:'Elite floor general. Runs offense with patience beyond his years. Needs to add strength for finishing through contact. Leadership is off the charts.', tag:'performance' },
    { id:2, author:'Coach Williams', date:'Mar 20, 2026', text:'First film review — crossover package is NCAA-ready. Defensive lateral movement needs work.', tag:'film' },
  ],
  Collins: [
    { id:11, author:'Coach Williams', date:'Mar 25, 2026', text:'Five-star talent. Very impressive Peach Jam showing. High-priority target.', tag:'performance' },
  ],
};
const tagColors = {
  general:'background:var(--card-border);color:var(--text2)', performance:'background:var(--mint-soft);color:var(--accent)',
  injury:'background:var(--rose-soft);color:var(--rose)', academic:'background:var(--blue-soft);color:var(--blue)',
  character:'background:var(--gold-soft);color:var(--gold)', film:'background:var(--orange-soft);color:var(--orange)',
};

let editingNoteId = null;

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

const posTagClassAp = { PG:'tag-blue', SG:'tag-blue', SF:'tag-orange', PF:'tag-orange', C:'tag-mint' };

const allPlayerProfiles = {
  jalen: {
    name:'Jalen Rivera', initials:'JR', color:'var(--gold)', pos:'PG', ht:"6'1\"", wt:'175 lbs', gender:'Male', classYr:'2026',
    stage:'Discovery', stageClass:'tag-orange', verified:true, flagged:false, aiScore:91, stars:4, gpa:'3.8',
    fullName:'Jalen Michael Rivera', dob:'Mar 14, 2008', hometown:'Atlanta, GA', school:'Westfield Academy', wingspan:"6'4\"",
    sat:'1280', major:'Business Administration', extracurriculars:'Student Gov · Mentoring Program', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'Nike EYBL — Atlanta Celtics', posLong:'Point Guard',
    ppg:'18.4 ppg', apg:'7.2 apg', rpg:'3.1 rpg', fg:'47.3%', tp:'38.6%', ft:'84.1%',
    skills:[['Ball Handling',92,'var(--accent)'],['Court Vision',88,'var(--blue)'],['3PT Shooting',76,'var(--gold)'],['Transition',85,'var(--accent)'],['Defense',70,'var(--orange)'],['Leadership',94,'var(--accent)']],
    films:[
      {cls:'ft-a',title:'Crossover + Pull-up Jumper',meta:'EYBL Atlanta · Apr 12, 2026 · Q2 3:41',dur:'0:09',ok:true},
      {cls:'ft-b',title:'Full Game — vs. Southeast Elite',meta:'EYBL Session 2 · Mar 28, 2026',dur:'32:14',ok:true},
      {cls:'ft-d',title:'Defensive Highlights Package',meta:'HS Season · Jan 2026',dur:'2:48',ok:true},
    ],
    timeline:[
      {dot:'green',title:'Added to Discovery Pipeline',desc:'Auto-matched from AI criteria "Floor General"',time:'Mar 28'},
      {dot:'blue',title:'Film Verified',desc:'3 clips cleared integrity check — Nike EYBL',time:'Mar 26'},
      {dot:'gold',title:'Coach Note Added',desc:'Coach T. Chen (Duke) shared film evaluation',time:'Mar 25'},
      {dot:'green',title:'Player Entered System',desc:'Imported from EYBL roster data',time:'Mar 20'},
    ],
    schoolsRecruiting:'Duke, UNC, Kansas, Gonzaga', offers:'None yet', commitment:'Uncommitted',
  },
  rashad: {
    name:'Rashad Collins', initials:'RC', color:'var(--accent)', pos:'PG', ht:"6'2\"", wt:'180 lbs', gender:'Male', classYr:'2026',
    stage:'Visit', stageClass:'tag-gold', verified:true, flagged:false, aiScore:94, stars:5, gpa:'3.5',
    fullName:'Rashad Collins', dob:'Jun 2, 2008', hometown:'Miami, FL', school:'American Heritage', wingspan:"6'5\"",
    sat:'1190', major:'Undecided', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'Peach Jam — Team Thrill', posLong:'Point Guard',
    ppg:'22.1 ppg', apg:'6.4 apg', rpg:'3.8 rpg', fg:'48.6%', tp:'37.2%', ft:'82.4%',
    skills:[['Ball Handling',94,'var(--accent)'],['Finishing',92,'var(--blue)'],['Court Vision',88,'var(--gold)'],['3PT Shooting',78,'var(--accent)'],['Leadership',86,'var(--orange)']],
    films:[{cls:'ft-b',title:'Euro Step + Finish',meta:'Peach Jam · Q2 7:12',dur:'0:07',ok:true}],
    timeline:[{dot:'gold',title:'Official visit scheduled',desc:'Campus visit — Apr 4',time:'Mar 30'},{dot:'green',title:'Film Verified',desc:'Peach Jam package cleared',time:'Mar 22'}],
    schoolsRecruiting:'Kentucky, Duke, Kansas', offers:'Multiple', commitment:'Uncommitted',
  },
  marcus: {
    name:'Marcus Davis', initials:'MD', color:'var(--rose)', pos:'SG', ht:"6'2\"", wt:'180 lbs', gender:'Male', classYr:'2026',
    stage:'Hold', stageClass:'tag-rose', verified:false, flagged:true, aiScore:null, stars:3, gpa:'3.1',
    fullName:'Marcus Davis', dob:'—', hometown:'Las Vegas, NV', school:'—', wingspan:'—',
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Pending review', eligibilityStyle:'color:var(--rose)',
    circuit:'Unknown', posLong:'Shooting Guard',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Shooting',62,'var(--gold)'],['Athleticism',58,'var(--blue)'],['Ball Handling',55,'var(--accent)']],
    films:[{cls:'ft-c',title:'Highlight Reel',meta:'Unknown source · needs verification',dur:'4:12',ok:false}],
    timeline:[{dot:'gold',title:'Integrity flag',desc:'Film source could not be verified',time:'Mar 18'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  elijah: {
    name:'Elijah Lewis', initials:'EL', color:'var(--orange)', pos:'PF', ht:"6'7\"", wt:'220 lbs', gender:'Male', classYr:'2027',
    stage:'Review', stageClass:'tag-blue', verified:true, flagged:false, aiScore:86, stars:4, gpa:'3.3',
    fullName:'Elijah Lewis', dob:'Aug 22, 2009', hometown:'Houston, TX', school:'Bellaire HS', wingspan:"6'10\"",
    sat:'1140', major:'Kinesiology', extracurriculars:'Volunteer coach (youth)', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'UAA Circuit', posLong:'Power Forward',
    ppg:'12.6 ppg', apg:'1.9 apg', rpg:'8.1 rpg', fg:'51.2%', tp:'28.4%', ft:'72.8%',
    skills:[['Rebounding',90,'var(--accent)'],['Post Moves',78,'var(--blue)'],['Interior D',84,'var(--gold)'],['Athleticism',88,'var(--accent)']],
    films:[{cls:'ft-d',title:'P&R Ball Handler',meta:'UAA · Q1 3:18',dur:'0:11',ok:true}],
    timeline:[{dot:'blue',title:'Moved to film review',desc:'Coaching staff evaluation',time:'Mar 24'}],
    schoolsRecruiting:'Baylor, Houston, Texas', offers:'—', commitment:'Uncommitted',
  },
  samuel: {
    name:'Samuel Powell', initials:'SP', color:'var(--accent)', pos:'C', ht:"6'10\"", wt:'245 lbs', gender:'Male', classYr:'2026',
    stage:'Offered', stageClass:'tag-mint', verified:true, flagged:false, aiScore:92, stars:5, gpa:'3.6',
    fullName:'Samuel Powell', dob:'Jan 9, 2008', hometown:'Phoenix, AZ', school:'Hillcrest Prep', wingspan:"7'2\"",
    sat:'1180', major:'Business', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'Adidas 3SSB', posLong:'Center',
    ppg:'16.2 ppg', apg:'1.4 apg', rpg:'9.8 rpg', fg:'54.6%', tp:'18.2%', ft:'68.4%',
    skills:[['Shot Blocking',94,'var(--accent)'],['Rebounding',92,'var(--blue)'],['Post Moves',86,'var(--gold)']],
    films:[{cls:'ft-a',title:'Post Moves + Block',meta:'3SSB · Q4 2:45',dur:'0:14',ok:true}],
    timeline:[{dot:'green',title:'Offer extended',desc:'Program offer on file',time:'Mar 20'}],
    schoolsRecruiting:'Multiple Power 5', offers:'12+', commitment:'Uncommitted',
  },
  maya: {
    name:'Maya Thompson', initials:'MT', color:'var(--gold)', pos:'PG', ht:"5'8\"", wt:'145 lbs', gender:'Female', classYr:'2027',
    stage:'Discovery', stageClass:'tag-orange', verified:true, flagged:false, aiScore:89, stars:4, gpa:'3.9',
    fullName:'Maya Thompson', dob:'Apr 3, 2009', hometown:'Dallas, TX', school:'Prestonwood Academy', wingspan:"5'11\"",
    sat:'1220', major:'Psychology', extracurriculars:'NHS', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'Nike Nationals', posLong:'Point Guard',
    ppg:'15.2 ppg', apg:'6.8 apg', rpg:'2.4 rpg', fg:'44.8%', tp:'36.2%', ft:'88.0%',
    skills:[['Court Vision',90,'var(--accent)'],['Ball Handling',84,'var(--blue)'],['Composure',88,'var(--gold)']],
    films:[{cls:'ft-b',title:'Full Court Vision',meta:'Nike · 0:12',dur:'0:12',ok:true}],
    timeline:[{dot:'green',title:'Discovery',desc:'WBB recruiting board',time:'Mar 27'}],
    schoolsRecruiting:'Stanford, UCLA, Texas', offers:'—', commitment:'Uncommitted',
  },
  dwilliams: {
    name:'DeAndre Williams', initials:'DW', color:'var(--blue)', pos:'SF', ht:"6'5\"", wt:'205 lbs', gender:'Male', classYr:'2026',
    stage:'Contacted', stageClass:'tag-blue', verified:true, flagged:false, aiScore:85, stars:4, gpa:'3.2',
    fullName:'DeAndre Williams', dob:'—', hometown:'Chicago, IL', school:'—', wingspan:"6'8\"",
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'UAA Circuit', posLong:'Small Forward',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Transition',82,'var(--blue)'],['Versatility',80,'var(--accent)'],['3PT Shooting',72,'var(--gold)']],
    films:[{cls:'ft-d',title:'Transition Dunk',meta:'UAA · 0:06',dur:'0:06',ok:true}],
    timeline:[{dot:'blue',title:'Outreach logged',desc:'Intro email sent',time:'Mar 26'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  aaliyah: {
    name:'Aaliyah Johnson', initials:'AJ', color:'var(--accent)', pos:'C', ht:"6'2\"", wt:'190 lbs', gender:'Female', classYr:'2027',
    stage:'Visit', stageClass:'tag-gold', verified:true, flagged:false, aiScore:93, stars:5, gpa:'3.7',
    fullName:'Aaliyah Johnson', dob:'—', hometown:'Atlanta, GA', school:'Westlake HS', wingspan:'—',
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'EYBL Girls', posLong:'Center',
    ppg:'14.8 ppg', apg:'1.6 apg', rpg:'10.2 rpg', fg:'52.4%', tp:'22.0%', ft:'72.8%',
    skills:[['Shot Blocking',92,'var(--accent)'],['Rebounding',90,'var(--blue)'],['Interior D',88,'var(--gold)']],
    films:[{cls:'ft-a',title:'Block + Outlet',meta:'EYBL · 0:08',dur:'0:08',ok:true}],
    timeline:[{dot:'gold',title:'Visit interest',desc:'High priority WBB target',time:'Mar 25'}],
    schoolsRecruiting:'South Carolina, LSU, UConn', offers:'Multiple', commitment:'Uncommitted',
  },
  christine: {
    name:'Christine Walters', initials:'CW', color:'var(--blue)', pos:'PG', ht:"5'9\"", wt:'140 lbs', gender:'Female', classYr:'2028',
    stage:'Watch list', stageClass:'tag-blue', verified:true, flagged:false, aiScore:81, stars:3, gpa:'3.4',
    fullName:'Christine Walters', dob:'—', hometown:'Minneapolis, MN', school:'—', wingspan:'—', sat:'—', major:'—', extracurriculars:'—',
    eligibility:'Cleared', eligibilityStyle:'color:var(--accent)', circuit:'North Tartan', posLong:'Point Guard',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Court Vision',78,'var(--blue)'],['Shooting',72,'var(--gold)'],['Defense',68,'var(--accent)']],
    films:[{cls:'ft-d',title:'Scrimmage tape',meta:'Fall league · 2:04',dur:'2:04',ok:true}],
    timeline:[{dot:'green',title:'Database entry',desc:'Scouting library',time:'Feb 2026'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  paige: {
    name:'Paige Donovan', initials:'PD', color:'var(--blue)', pos:'SG', ht:"6'0\"", wt:'165 lbs', gender:'Female', classYr:'2026',
    stage:'Database', stageClass:'tag-mint', verified:true, flagged:false, aiScore:83, stars:4, gpa:'3.6',
    fullName:'Paige Donovan', dob:'—', hometown:'Boston, MA', school:'—', wingspan:'—', sat:'—', major:'—', extracurriculars:'—',
    eligibility:'Cleared', eligibilityStyle:'color:var(--accent)', circuit:'Bay State Flash', posLong:'Shooting Guard',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Shooting',80,'var(--gold)'],['Defense',74,'var(--blue)']],
    films:[{cls:'ft-a',title:'Shooting drill',meta:'Skills camp · 0:45',dur:'0:45',ok:true}],
    timeline:[{dot:'blue',title:'Tagged in database',desc:'Bay State program',time:'Mar 2026'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  skylar: {
    name:'Skylar Reese', initials:'SR', color:'var(--orange)', pos:'PF', ht:"6'1\"", wt:'172 lbs', gender:'Female', classYr:'2029',
    stage:'Scouted', stageClass:'tag-blue', verified:true, flagged:false, aiScore:76, stars:3, gpa:'3.2',
    fullName:'Skylar Reese', dob:'—', hometown:'Phoenix, AZ', school:'—', wingspan:'—', sat:'—', major:'—', extracurriculars:'—',
    eligibility:'Cleared', eligibilityStyle:'color:var(--accent)', circuit:'Arizona Power', posLong:'Power Forward',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Rebounding',74,'var(--orange)'],['Post Moves',70,'var(--accent)']],
    films:[{cls:'ft-b',title:'AAU highlights',meta:'Regional · 1:18',dur:'1:18',ok:true}],
    timeline:[{dot:'green',title:'AAU profile imported',time:'Jan 2026'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  chris: {
    name:'Chris Okoro', initials:'CO', color:'var(--mint)', pos:'C', ht:"6'8\"", wt:'230 lbs', gender:'Male', classYr:'2027',
    stage:'Watch list', stageClass:'tag-blue', verified:true, flagged:false, aiScore:79, stars:3, gpa:'3.0',
    fullName:'Chris Okoro', dob:'—', hometown:'Memphis, TN', school:'—', wingspan:'—', sat:'—', major:'—', extracurriculars:'—',
    eligibility:'Cleared', eligibilityStyle:'color:var(--accent)', circuit:'Bluff City Legends', posLong:'Center',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Shot Blocking',76,'var(--mint)'],['Rebounding',74,'var(--accent)']],
    films:[{cls:'ft-c',title:'Post footwork',meta:'Showcase · 0:52',dur:'0:52',ok:true}],
    timeline:[{dot:'blue',title:'Watch list',time:'Feb 2026'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  tyler: {
    name:'Tyler Brennan', initials:'TB', color:'var(--blue)', pos:'PG', ht:"6'0\"", wt:'172 lbs', gender:'Male', classYr:'2028',
    stage:'Database', stageClass:'tag-mint', verified:true, flagged:false, aiScore:68, stars:2, gpa:'3.5',
    fullName:'Tyler Brennan', dob:'—', hometown:'Indianapolis, IN', school:'—', wingspan:'—', sat:'—', major:'—', extracurriculars:'—',
    eligibility:'Cleared', eligibilityStyle:'color:var(--accent)', circuit:'Indy Heat', posLong:'Point Guard',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Speed',72,'var(--blue)'],['Ball Handling',68,'var(--gold)']],
    films:[{cls:'ft-d',title:'Full game',meta:'HS · 32:10',dur:'32:10',ok:true}],
    timeline:[{dot:'green',title:'Database',desc:'Indy Heat feeder',time:'2026'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  ethan: {
    name:'Ethan Morales', initials:'EM', color:'var(--orange)', pos:'SF', ht:"6'4\"", wt:'198 lbs', gender:'Male', classYr:'2027',
    stage:'Scouted', stageClass:'tag-blue', verified:false, flagged:true, aiScore:84, stars:4, gpa:'3.3',
    fullName:'Ethan Morales', dob:'—', hometown:'San Antonio, TX', school:'—', wingspan:'—', sat:'—', major:'—', extracurriculars:'—',
    eligibility:'Pending', eligibilityStyle:'color:var(--orange)', circuit:'SA Finest', posLong:'Small Forward',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Athleticism',82,'var(--orange)'],['3PT Shooting',70,'var(--gold)']],
    films:[{cls:'ft-a',title:'Transition O',meta:'Tournament · 0:33',dur:'0:33',ok:false}],
    timeline:[{dot:'gold',title:'Integrity pending',desc:'Film review queue',time:'Mar 2026'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  mitchell: {
    name:'Kyle Mitchell', initials:'KM', color:'var(--blue)', pos:'SG', ht:"6'3\"", wt:'185 lbs', gender:'Male', classYr:'2026',
    stage:'Discovery', stageClass:'tag-orange', verified:true, flagged:false, aiScore:84, stars:4, gpa:'3.4',
    fullName:'Kyle Mitchell', dob:'—', hometown:'Chicago, IL', school:'Whitney Young HS', wingspan:"6'6\"",
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'Nike EYBL', posLong:'Shooting Guard',
    ppg:'12.1 ppg', apg:'2.8 apg', rpg:'3.2 rpg', fg:'43.0%', tp:'35.0%', ft:'80.0%',
    skills:[['Shooting',82,'var(--blue)'],['Defense',74,'var(--accent)'],['Off-Ball',76,'var(--gold)']],
    films:[{cls:'ft-4',title:'Corner Three off Screen',meta:'HS Season · Q4',dur:'0:05',ok:true}],
    timeline:[{dot:'green',title:'Discovery',desc:'Man\'s board',time:'Mar 28'}],
    schoolsRecruiting:'Illinois, Marquette', offers:'—', commitment:'Uncommitted',
  },
  washington: {
    name:'Terrence Washington', initials:'TW', color:'var(--mint)', pos:'C', ht:"6'9\"", wt:'235 lbs', gender:'Male', classYr:'2026',
    stage:'Scouted', stageClass:'tag-blue', verified:true, flagged:false, aiScore:79, stars:4, gpa:'3.2',
    fullName:'Terrence Washington', dob:'—', hometown:'New York, NY', school:'Christ the King', wingspan:"7'1\"",
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'NY Catholic League', posLong:'Center',
    ppg:'11.4 ppg', apg:'1.1 apg', rpg:'8.2 rpg', fg:'54.0%', tp:'18.0%', ft:'62.0%',
    skills:[['Rim Protection',88,'var(--mint)'],['Rebounding',84,'var(--blue)']],
    films:[{cls:'ft-5',title:'Weak Side Block',meta:'HS Season · Q3',dur:'0:04',ok:true}],
    timeline:[{dot:'blue',title:'Film indexed',time:'Mar 26'}],
    schoolsRecruiting:'St. John\'s, Rutgers', offers:'—', commitment:'Uncommitted',
  },
  sienna: {
    name:'Sienna Cole', initials:'SC', color:'var(--blue)', pos:'SG', ht:"5'10\"", wt:'155 lbs', gender:'Female', classYr:'2027',
    stage:'Review', stageClass:'tag-blue', verified:true, flagged:false, aiScore:86, stars:4, gpa:'3.5',
    fullName:'Sienna Cole', dob:'—', hometown:'Denver, CO', school:'—', wingspan:'—',
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'Club Circuit', posLong:'Shooting Guard',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Shooting',80,'var(--gold)'],['Defense',72,'var(--blue)']],
    films:[{cls:'ft-c',title:'Catch & Shoot',meta:'Club · 0:06',dur:'0:06',ok:true}],
    timeline:[{dot:'blue',title:'Film review',time:'Mar 24'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  jordan: {
    name:'Jordan Ellis', initials:'JE', color:'var(--orange)', pos:'PF', ht:"6'1\"", wt:'175 lbs', gender:'Female', classYr:'2028',
    stage:'Discovery', stageClass:'tag-orange', verified:true, flagged:false, aiScore:84, stars:4, gpa:'3.4',
    fullName:'Jordan Ellis', dob:'—', hometown:'Seattle, WA', school:'—', wingspan:'—',
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'Northwest Elite', posLong:'Power Forward',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Mid-Range',78,'var(--orange)'],['Rebounding',76,'var(--accent)']],
    films:[{cls:'ft-d',title:'High Post Face-up',meta:'Elite · 0:10',dur:'0:10',ok:true}],
    timeline:[{dot:'green',title:'Added to board',time:'Mar 22'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  riley: {
    name:'Riley Park', initials:'RP', color:'var(--gold)', pos:'SF', ht:"5'11\"", wt:'158 lbs', gender:'Female', classYr:'2027',
    stage:'Hold', stageClass:'tag-rose', verified:false, flagged:true, aiScore:null, stars:3, gpa:'3.2',
    fullName:'Riley Park', dob:'—', hometown:'Portland, OR', school:'—', wingspan:'—',
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Pending review', eligibilityStyle:'color:var(--rose)',
    circuit:'Rose City AAU', posLong:'Small Forward',
    ppg:'—', apg:'—', rpg:'—', fg:'—', tp:'—', ft:'—',
    skills:[['Versatility',70,'var(--gold)'],['Shooting',68,'var(--blue)']],
    films:[{cls:'ft-a',title:'Highlight Reel',meta:'Combo · 3:20',dur:'3:20',ok:false}],
    timeline:[{dot:'gold',title:'Integrity review',desc:'Flagged for verification',time:'Mar 20'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  djackson: {
    name:'Devon Jackson', initials:'DJ', color:'var(--orange)', pos:'SF', ht:"6'6\"", wt:'210 lbs', gender:'Male', classYr:'2027',
    stage:'Contacted', stageClass:'tag-blue', verified:true, flagged:false, aiScore:88, stars:4, gpa:'3.5',
    fullName:'Devon Jackson', dob:'—', hometown:'Miami, FL', school:'—', wingspan:'—',
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'Nike EYBL', posLong:'Small Forward',
    ppg:'10.2 ppg', apg:'2.1 apg', rpg:'5.5 rpg', fg:'48.2%', tp:'31.6%', ft:'74.5%',
    skills:[['Energy',88,'var(--orange)'],['Rebounding',80,'var(--blue)'],['Athleticism',84,'var(--accent)']],
    films:[{cls:'ft-b',title:'Transition finish',meta:'EYBL · 0:08',dur:'0:08',ok:true}],
    timeline:[{dot:'blue',title:'Outreach',desc:'Intro call logged',time:'Mar 25'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  brooks: {
    name:'Anthony Brooks', initials:'AB', color:'var(--gold)', pos:'PG', ht:"6'0\"", wt:'168 lbs', gender:'Male', classYr:'2027',
    stage:'Contacted', stageClass:'tag-blue', verified:true, flagged:false, aiScore:82, stars:3, gpa:'3.4',
    fullName:'Anthony Brooks', dob:'—', hometown:'Seattle, WA', school:'—', wingspan:'—',
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'UAA', posLong:'Point Guard',
    ppg:'8.4 ppg', apg:'4.1 apg', rpg:'2.0 rpg', fg:'41.8%', tp:'35.2%', ft:'86.0%',
    skills:[['Speed',84,'var(--accent)'],['Ball Handling',78,'var(--blue)'],['3PT Shooting',72,'var(--gold)']],
    films:[{cls:'ft-d',title:'Pick & roll read',meta:'UAA · 0:09',dur:'0:09',ok:true}],
    timeline:[{dot:'blue',title:'Email opened',desc:'Follow-up scheduled',time:'Mar 24'}],
    schoolsRecruiting:'—', offers:'—', commitment:'Uncommitted',
  },
  foster: {
    name:'Noah Foster', initials:'NF', color:'var(--accent)', pos:'SF', ht:"6'5\"", wt:'205 lbs', gender:'Male', classYr:'2027',
    stage:'Offered', stageClass:'tag-mint', verified:true, flagged:false, aiScore:89, stars:4, gpa:'3.5',
    fullName:'Noah Foster', dob:'—', hometown:'Houston, TX', school:'—', wingspan:'—',
    sat:'—', major:'—', extracurriculars:'—', eligibility:'Cleared', eligibilityStyle:'color:var(--accent)',
    circuit:'UAA Circuit', posLong:'Small Forward',
    ppg:'14.1 ppg', apg:'2.8 apg', rpg:'6.4 rpg', fg:'46.8%', tp:'34.5%', ft:'81.2%',
    skills:[['Rebounding',86,'var(--accent)'],['Transition',84,'var(--blue)'],['Versatility',82,'var(--gold)']],
    films:[{cls:'ft-a',title:'Transition dunk',meta:'UAA · 0:06',dur:'0:06',ok:true}],
    timeline:[{dot:'green',title:'Offer pending',desc:'Awaiting response',time:'Mar 22'}],
    schoolsRecruiting:'Multiple', offers:'Discussion', commitment:'Uncommitted',
  },
};

function buildCoachNotesDetailHtml(lastName) {
  const arr = playerNotes[lastName];
  if (!arr || !arr.length) {
    return '<div class="dp-section"><div class="dp-section-title">Coach Notes</div><div class="dp-notes"><p style="font-size:12px;color:var(--text3);padding:8px 0">No coach notes yet.</p></div></div>';
  }
  return '<div class="dp-section"><div class="dp-section-title">Coach Notes</div><div class="dp-notes">' +
    arr.map(n => '<div class="dp-note"><div class="dp-note-header"><span class="dp-note-author">' + escapeHtml(n.author) + '</span><span class="dp-note-date">' + escapeHtml(n.date) + '</span></div><div class="dp-note-text">' + escapeHtml(n.text) + '</div></div>').join('') +
    '</div></div>';
}

function buildPlayerDetailHtml(p, notesKey) {
  const aiColor = p.aiScore == null ? 'var(--text3)' : (p.aiScore >= 90 ? 'var(--accent)' : p.aiScore >= 85 ? 'var(--blue)' : 'var(--gold)');
  const aiVal = p.aiScore == null ? 'N/A' : String(p.aiScore);
  const dimStar = p.stars < 5 ? ('<span class="star-dim">' + '★'.repeat(5 - p.stars) + '</span>') : '';
  const starsDisplay = '★'.repeat(p.stars) + dimStar;

  const skillsBlock = p.skills.map(([label, w, c]) =>
    '<div class="dp-metric-row"><span class="dp-metric-label">' + escapeHtml(label) + '</span><div class="dp-metric-track"><div class="dp-metric-fill" style="width:' + w + '%;background:' + c + '"></div></div><span class="dp-metric-val" style="color:' + c + '">' + w + '</span></div>'
  ).join('');

  const filmsBlock = p.films.map(f =>
    '<div class="dp-film"><div class="dp-film-thumb ' + f.cls + '">▶</div><div class="dp-film-info"><div class="dp-film-name">' + escapeHtml(f.title) + '</div><div class="dp-film-meta">' + escapeHtml(f.meta) + '</div></div>' +
    (f.ok ? '<span class="badge-sm badge-ok" style="font-size:9px">✓</span>' : '<span class="badge-sm badge-flag" style="font-size:9px">⚠</span>') +
    '<span class="dp-film-dur">' + escapeHtml(f.dur) + '</span></div>'
  ).join('');

  const timelineBlock = p.timeline.map(t =>
    '<div class="dp-event"><div class="dp-event-dot ' + t.dot + '"></div><div class="dp-event-info"><div class="dp-event-title">' + escapeHtml(t.title) + '</div><div class="dp-event-desc">' + escapeHtml(t.desc) + '</div></div><span class="dp-event-time">' + escapeHtml(t.time) + '</span></div>'
  ).join('');

  return (
    '<div class="dp-section"><div class="dp-section-title">Key Stats</div><div class="dp-stats">' +
    '<div class="dp-stat"><div class="dp-stat-val" style="color:' + aiColor + '">' + aiVal + '</div><div class="dp-stat-label">AI Score</div></div>' +
    '<div class="dp-stat"><div class="dp-stat-val" style="color:var(--gold)">' + starsDisplay + '</div><div class="dp-stat-label">Star Rating</div></div>' +
    '<div class="dp-stat"><div class="dp-stat-val" style="color:var(--accent)">' + escapeHtml(p.gpa) + '</div><div class="dp-stat-label">GPA</div></div></div></div>' +

    '<div class="dp-section"><div class="dp-section-title">Personal Information</div>' +
    rowAp('Full Name', p.fullName) + rowAp('Date of Birth', p.dob) + rowAp('Gender', p.gender) + rowAp('Hometown', p.hometown) +
    rowAp('High School', p.school) + rowAp('Height / Weight', p.ht + ' / ' + p.wt) + rowAp('Wingspan', p.wingspan) + rowAp('Class', p.classYr) + '</div>' +

    '<div class="dp-section"><div class="dp-section-title">Academics</div>' +
    rowAp('GPA', p.gpa + ' / 4.0') + rowAp('SAT', p.sat) + rowAp('Intended Major', p.major) + rowAp('Extracurriculars', p.extracurriculars) +
    '<div class="dp-row"><span class="dp-row-label">NCAA Eligibility</span><span class="dp-row-value" style="' + p.eligibilityStyle + '">' + escapeHtml(p.eligibility) + '</span></div></div>' +

    '<div class="dp-section"><div class="dp-section-title">Athletic Profile</div>' +
    rowAp('Position', p.posLong) + rowAp('AAU / Circuit', p.circuit) + rowAp('Avg Points', p.ppg) + rowAp('Avg Assists', p.apg) + rowAp('Avg Rebounds', p.rpg) +
    rowAp('FG %', p.fg) + rowAp('3PT %', p.tp) + rowAp('FT %', p.ft) + '</div>' +

    '<div class="dp-section"><div class="dp-section-title">AI Skill Breakdown</div>' + skillsBlock + '</div>' +

    '<div class="dp-section"><div class="dp-section-title">Film Library</div><div class="dp-film-list">' + filmsBlock + '</div></div>' +

    buildCoachNotesDetailHtml(notesKey) +

    '<div class="dp-section"><div class="dp-section-title">Recruiting Timeline</div><div class="dp-timeline">' + timelineBlock + '</div></div>' +

    '<div class="dp-section"><div class="dp-section-title">Known Interest</div>' +
    rowAp('Schools Recruiting', p.schoolsRecruiting) + rowAp('Offers Received', p.offers) + rowAp('Commitment Status', p.commitment) + '</div>'
  );
}

function rowAp(label, val) {
  return '<div class="dp-row"><span class="dp-row-label">' + escapeHtml(label) + '</span><span class="dp-row-value">' + escapeHtml(val) + '</span></div>';
}
function openPlayer(id) {
  const p = allPlayerProfiles[id];
  if (!p) return;
  if (!document.getElementById('detailPanel') || !document.getElementById('dpAvatar')) return;
  currentPlayerName = p.name;
  currentNotesKey = p.name.split(' ').pop();

  const softBg = p.color.replace(')', '-soft)').replace('var(','var(');
  const av = document.getElementById('dpAvatar');
  av.style.background = softBg;
  av.style.color = p.color;
  av.textContent = p.initials;

  document.getElementById('dpName').textContent = p.name;
  document.getElementById('dpMeta').textContent = p.pos + ' · ' + p.ht + ' · ' + p.wt + ' · ' + p.gender + ' · Class of ' + p.classYr;

  let tags = '<span class="tag ' + (posTagClassAp[p.pos] || 'tag-blue') + '" style="font-size:10px">' + escapeHtml(p.pos) + '</span> ';
  tags += '<span class="tag ' + p.stageClass + '" style="font-size:10px">' + escapeHtml(p.stage) + '</span>';
  if (p.verified === true) tags += ' <span class="badge-sm badge-ok">✓ Verified</span>';
  if (p.flagged) tags += ' <span class="badge-sm badge-flag">⚠ Flagged</span>';
  document.getElementById('dpTags').innerHTML = tags;

  document.getElementById('detailPanelBody').innerHTML = buildPlayerDetailHtml(p, currentNotesKey);

  document.getElementById('detailPanel').classList.add('open');
  document.getElementById('detailOverlay').classList.add('open');
}
function closePlayer() {
  document.getElementById('detailPanel').classList.remove('open');
  document.getElementById('detailOverlay').classList.remove('open');
}

document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  var p = document.getElementById('detailPanel');
  if (p && p.classList.contains('open')) closePlayer();
});
