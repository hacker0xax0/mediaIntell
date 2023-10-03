import express from 'express';

import { mapping } from '../controller/nmap.js';
import { allAtOnce, usr_hunt } from '../controller/sherlock.js';
import { insta_email_phone, instagram } from '../controller/instagram.js';
import { emailInUse } from '../controller/email.js';

const route = express.Router();

route.post("/net-mapper", mapping);
route.post("/hunt-username", usr_hunt);
route.post("/instagram", instagram);
route.post("/instagram-email-phone", insta_email_phone);
route.post("/profiler", allAtOnce);
route.post("/email-in-use", emailInUse);

export { route };



