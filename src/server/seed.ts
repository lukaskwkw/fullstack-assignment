import { Customer } from "../model";

const avatarSize = 240;
const avatarUrl = id => `https://i.pravatar.cc/${avatarSize}?img=${id}`;

const customersSeed: Array<Partial<Customer>> = [
  {
    id: "1",
    firstName: "Ab",
    lastName: "Goakes",
    email: "agoakes0@wsj.com",
    avatar: avatarUrl(7),
    balance: 10674.98
  },
  {
    id: "2",
    firstName: "Hally",
    lastName: "Orpin",
    email: "horpin1@paginegialle.it",
    avatar: avatarUrl(25),
    balance: 7002.17
  },
  {
    id: "3",
    firstName: "Mace",
    lastName: "Quinnelly",
    email: "mquinnelly2@hatena.ne.jp",
    avatar: avatarUrl(18),
    balance: 9821.53
  },
  {
    id: "4",
    firstName: "Lannie",
    lastName: "Jeynes",
    email: "ljeynes3@pcworld.com",
    avatar: avatarUrl(50),
    balance: 8270.45
  },
  {
    id: "5",
    firstName: "Keary",
    lastName: "Demaine",
    email: "kdemaine4@clickbank.net",
    avatar: avatarUrl(51),
    balance: 6896.63
  },
  {
    id: "6",
    firstName: "Clo",
    lastName: "Teasell",
    email: "cteasell5@live.com",
    avatar: avatarUrl(44),
    balance: 7680.4
  },
  {
    id: "7",
    firstName: "Phillie",
    lastName: "Mulqueen",
    email: "pmulqueen6@loc.gov",
    avatar: avatarUrl(47),
    balance: 4097.82
  },
  {
    id: "8",
    firstName: "Alejandrina",
    lastName: "Battell",
    email: "abattell7@histats.com",
    avatar: avatarUrl(43),
    balance: 969.87
  },
  {
    id: "9",
    firstName: "Orly",
    lastName: "Stiggers",
    email: "ostiggers8@redcross.org",
    avatar: avatarUrl(49),
    balance: 4153.27
  },
  {
    id: "10",
    firstName: "Igor",
    lastName: "Yegorkov",
    email: "iyegorkov9@wikipedia.org",
    avatar: avatarUrl(12),
    balance: 11763.69
  }
];

export default customersSeed;
