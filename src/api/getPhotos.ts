import { createApi } from "unsplash-js";

export interface Photo {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at?: any;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description?: string;
  alt_description?: string;
  urls: Urls;
  links: Links;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship?: any;
  topic_submissions: Topicsubmissions;
  user: User;
  tags: Tag[];
}

interface Tag {
  type: string;
  title: string;
  source?: Source;
}

interface Source {
  ancestry: Ancestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: Coverphoto;
}

interface Coverphoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at?: any;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description?: any;
  urls: Urls;
  links: Links;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship?: any;
  topic_submissions: Topicsubmissions2;
  user: User2;
}

interface User2 {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: Links2;
  profile_image: Profileimage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social2;
}

interface Social2 {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email?: any;
}

interface Topicsubmissions2 {
  "textures-patterns": Health;
}

interface Ancestry {
  type: Type;
  category: Type;
  subcategory: Type;
}

interface Type {
  slug: string;
  pretty_slug: string;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username?: string;
  portfolio_url?: string;
  bio?: string;
  location?: string;
  links: Links2;
  profile_image: Profileimage;
  instagram_username?: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

interface Social {
  instagram_username?: string;
  portfolio_url?: string;
  twitter_username?: string;
  paypal_email?: any;
}

interface Profileimage {
  small: string;
  medium: string;
  large: string;
}

interface Links2 {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface Topicsubmissions {
  film?: Film;
  travel?: Travel;
  health?: Health;
  "food-drink"?: Film;
  "comfort-food"?: Film;
}

interface Health {
  status: string;
  approved_on: string;
}

interface Travel {
  status: string;
  approved_on?: string;
}

interface Film {
  status: string;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

const unsplash = createApi({
  accessKey: "R7N1_coEu5U6OuR46YDTvJmYybC8vawg3imRi1uC1Xk",
});

interface GetProductsProps {
  keyword: string;
}

interface GetProducts {
  total: number;
  total_pages: number;
  results: Photo[];
}

const getPhotos = ({ keyword }: GetProductsProps) => {
  const productPromise = unsplash.search
    .getPhotos({
      query: keyword,
      perPage: 30,
    })
    .then((response) => response.response)
    .catch((e) => {
      throw e;
    });

  return {
    products: wrapPromise(productPromise),
  };
};

function wrapPromise(promise: Promise<any>) {
  let status = "pending"; // 최초의 상태
  let result: GetProducts[];

  // 프로미스 객체 자체
  let suspender = promise.then(
    (r) => {
      status = "success"; // 성공으로 완결시 success로
      result = r;
    },
    (e) => {
      status = "error"; // 실패로 완결시 error로
      result = e;
    }
  );

  // 위의 Suspense For Data Fetching 예제에서의 read() 메소드입니다.
  // 위 함수의 로직을 클로저삼아, 함수 밖에서 프로미스의 진행 상황을 읽는 인터페이스가 된다
  return {
    read() {
      if (status === "pending") {
        throw suspender; // 펜딩 프로미스를 throw 하면 Suspense의 Fallback UI를 보여준다
      } else if (status === "error") {
        throw result; // Error을 throw하는 경우 ErrorBoundary의 Fallback UI를 보여준다
      } else if (status === "success") {
        return result; // 결과값을 리턴하는 경우 성공 UI를 보여준다
      }
    },
  };
}

export { getPhotos };
