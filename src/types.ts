//Simulator3D 
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';


export interface Product {
  _id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
}

export interface ImageBannerProps {
  image1: string; 
  image2: string; 
  catchyLine: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface LoginFormFieldsProps {
  type: string; 
  label: string;
  error?: string | null;  
  register?: any;
}
//submitButton
export interface SubmitButtonProps {
  label: string;
  onClick: () => void;
}

//validationMessage
export interface ValidationMessageProps {
  message: string | undefined;
}

export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  address: string;
  mobileNumber: string;
  birthDate: string;
}

export interface GLTFResult extends GLTF {
  nodes: {
    ring: THREE.Mesh;
    diamonds: THREE.Mesh;
  };
  materials: {
    ring: THREE.MeshStandardMaterial;
    diamonds: THREE.MeshStandardMaterial;
  };
}

export interface RingProps {
  map: THREE.Texture;
  ringColor: string;
  diamondColor: string;
  [key: string]: any;
}

export interface Configuration {
  ringColor: string;
  diamondColor: string;
}

export interface ProductCardProps {
  id: string; 
  name: string;
  price: number;
  imageUrl: string;
}


//cart interfaces

export interface CartItem extends Product {
  quantity: number;
}


export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

// userTypes.ts
export interface UserState {
  username: string;
  email: string;
  address: string;
  mobileNumber: string;
  birthDate: string;
}

export const UPDATE_USER = 'UPDATE_USER';

interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: Partial<UserState>; 
}

export type UserActionTypes = UpdateUserAction;

export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';

interface FetchOrdersSuccessAction {
  type: typeof FETCH_ORDERS_SUCCESS;
  payload: Order[];
}

export type OrderActionTypes = FetchOrdersSuccessAction;

export interface Order {
  id: number;
  date: string;
  items: string[];
  totalAmount: number;
  status: string;
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  isPrimary: boolean;
}

export interface AddressBookState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}