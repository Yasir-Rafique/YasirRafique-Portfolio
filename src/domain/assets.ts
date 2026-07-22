import type { Asset, EntityId } from "./models";
import signaturePath from "../assets/signature-removebg-preview.png";

export const assets = {
  profile: {
    id: "asset.profile.photo",
    kind: "image",
    path: "/20240413_162435.jpg",
    alt: "Muhammad Yasir Rafique",
  },
  profileRound: {
    id: "asset.profile.round",
    kind: "image",
    path: "/RoundImage.png",
    alt: "Muhammad Yasir Rafique",
  },
  profileRoundModified: {
    id: "asset.profile.round-modified",
    kind: "image",
    path: "/RoundImage-modified.png",
    alt: "Muhammad Yasir Rafique",
  },
  signature: {
    id: "asset.profile.signature",
    kind: "image",
    path: signaturePath,
    alt: "Signature",
  },
  certificationIbmAi: {
    id: "asset.certification.ibm-ai",
    kind: "document",
    path: "/certifications/Coursera-6TOMPAUZDQUX.pdf",
  },
  certificationReactNative: {
    id: "asset.certification.react-native",
    kind: "image",
    path: "/certifications/Course-Certificate.jpg",
  },
  certificationGraphql: {
    id: "asset.certification.graphql",
    kind: "document",
    path: "/certifications/Coursera-H7NLFXDVL3SD.pdf",
  },
  certificationAwsS3: {
    id: "asset.certification.aws-s3",
    kind: "document",
    path: "/certifications/Coursera-R2GGN35ZXVB3.pdf",
  },
  achievementFmfGrowth: {
    id: "asset.achievement.fmf-growth",
    kind: "image",
    path: "/achievements/FMF-growth.png",
  },
  achievementGithub: {
    id: "asset.achievement.github",
    kind: "image",
    path: "/achievements/GitHub-Achievements.png",
  },
  achievementDzoneEmail: {
    id: "asset.achievement.dzone-email",
    kind: "image",
    path: "/achievements/dzone-feature-email.jpg",
  },
  achievementDzoneComment: {
    id: "asset.achievement.dzone-comment",
    kind: "image",
    path: "/achievements/dzone-editor-comment.png",
  },
  achievementConf42Email: {
    id: "asset.achievement.conf42-email",
    kind: "image",
    path: "/achievements/C42_Banner.png",
  },
  achievementConf42Banner: {
    id: "asset.achievement.conf42-banner",
    kind: "image",
    path: "/achievements/Conf42-talk-banner.png",
  },
  avatarMale1: { id: "asset.avatar.male-1", kind: "icon", path: "/avatars/Male-1.svg" },
  avatarFemale1: { id: "asset.avatar.female-1", kind: "icon", path: "/avatars/Female-1.svg" },
  avatarMale2: { id: "asset.avatar.male-2", kind: "icon", path: "/avatars/Male-2.svg" },
  avatarMale3: { id: "asset.avatar.male-3", kind: "icon", path: "/avatars/Male-3.svg" },
  avatarFemale2: { id: "asset.avatar.female-2", kind: "icon", path: "/avatars/Female-2.svg" },
  avatarFemale3: { id: "asset.avatar.female-3", kind: "icon", path: "/avatars/Female-3.svg" },
  avatarMale4: { id: "asset.avatar.male-4", kind: "icon", path: "/avatars/Male-4.svg" },
  avatarMale5: { id: "asset.avatar.male-5", kind: "icon", path: "/avatars/Male-5.svg" },
  avatarFemale4: { id: "asset.avatar.female-4", kind: "icon", path: "/avatars/Female-4.svg" },
} as const satisfies Record<string, Asset>;

export const testimonialAvatarPaths = [
  assets.avatarMale1.path,
  assets.avatarFemale1.path,
  assets.avatarMale2.path,
  assets.avatarMale3.path,
  assets.avatarFemale2.path,
  assets.avatarFemale3.path,
  assets.avatarMale4.path,
  assets.avatarMale5.path,
  assets.avatarFemale4.path,
];

const assetsById = new Map<Asset["id"], Asset>(
  Object.values(assets).map((asset) => [asset.id, asset]),
);

export function getAsset(id: EntityId<"asset">): Asset {
  const asset = assetsById.get(id);
  if (!asset) throw new Error(`Unknown asset: ${id}`);
  return asset;
}
