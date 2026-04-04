
import { Product } from "@/types";


export const products: Product[] = [
    {
        id: 1,
        name: "Whole Cream Heritage Milk",
        price: 4.5,
        description:
            "Non-homogenized, pasture-raised milk with a thick cream top. Collected daily at sunrise.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0FS5WbNfomAdynTi15XEm_dtJfn6KeP0Q8ERn4mMnRcsZ6mpOpvAEuC5XnUcGOhDhAHRWgjdDutGZZ2RzCQ5Y6QY304UMqKINO46E0mOBwhEvJr--bIQ91BKoC44mGGgO14ulnPHOQYBd3_2dw95njBDWaQvN1XjLv6vsLKPA8_GRX32eVKK5Qy2Ry1WFww2qz1jIvKppM-MerU3G49WC8F1wRog3-N2WsZmvuEZ2hWB00u409kjFxuju99TPTJOE7msMRNUbprUr",
        category: "Milk",
        unit: "Liters",
        rating: 4,
        isFeatured: true,
        badge: "Weekly Special",
    },
    {
        id: 2,
        name: "Clover Honey Yoghurt",
        price: 6.2,
        unit: "Liters",
        rating: 5,
        description:
            "Triple-strained for maximum silkiness. Made with raw honey from local farms.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb1K-FSm78wfr8l4EsQ7H-cqFTWZiUEbl1BRlv7BoBTZc8_Eo9f12fMyIyZToYb-nblmUYPetAVK5BQZfl8RXOmXjkVn9j9HZNPSbTXoyUiLq23crULfxLpcbTGtW_v9JZuwSrG0iD7k2KIzwis_Iyc9MIxN0C8kO0Lvv2q6LK4eNzU0l7TBRu8uLxdgBGpzJqh-r_y9TrM7VKk39MM_sfPQSklPMJsk2NoaaQZp8rLIImOwubOkYuaJ2X8F0f_xyX5RhvQMtTGnWu",
        category: "Yoghurt",
        isPopular: true,
    },
    {
        id: 3,
        name: "Country Sourdough",
        price: 5.8,
        unit: "Pieces",
        rating: 5,
        description:
            "36-hour slow fermented farm loaf with a perfect crust and tangy crumb.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDazdYAkWK2aIrZrjy6a_WSthDa1wlmC03EaOBq-04G2MIOoFdOK0NeWAC05uEZbadlfUpzcuopR8vC3HX7QshjswTgWuNCkkmroF-WV7zV1bJGkH7xZIHLzSKSNLhOlJAcF3WPGGb-OIFN8E7Y30b3JQNmUAdnF5YatuleR3SqNTdj83MvfM1D2bcKH_cIBORD6CY4L_Pc0k4UhkcwIOy2mMI3ia_H77FItct-MayC8HnEI3bLqDG0aLGrbX4PoLry54_9wf941MGR",
        category: "Bread",
    },
    {
        id: 4,
        name: "Traditional Spiced Mala",
        price: 3.9,
        unit: "Liters",
        rating: 5,
        description:
            "Fermented with heritage cultures for that authentic tangy flavor.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPQ3JRsuTntdPqZ0nNefZJH5B3OyYKPKvwkz2a7M-cYPLOb5jhC-9eM_OyXFIbT04UlTVK9go_SrYSMqXsoZ1x8KQLLk6qwmg7zbqkcf8Y_egmcyNp8fq--VHHmHFKQVtIx1GpWcFlcSwARSzoWYAqmXbuSidMIb8YLP6b1bKReeDMGcayZQEmoHmvpsL6exwaUbNwYxP5jSYXtncThsdhbiLzyRDB4ZCS-OlKyP8ZpPSYR_M8FpKCY12nwDMH7igQvTNdC27pbQtm",
        category: "Mala",
    },
    {
        id: 5,
        name: "Double Cream Choco Cake",
        price: 12.5,
        unit: "Piece",
        rating: 5,
        description:
            "Made with 100% farm-fresh butter and rich Belgian chocolate.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsp0q98K078o0jMNO6OLl2uTugtzrz9ZBPGLMIGPxUkdAVruukryrkASZhq6rKBbcIYagEVIg2KX4en4gWpR_pqJIJK3U6q_fKJf3vghZlG0G_9YrlMfXv_2J3iRfFEsmqAyzDmSr927KRJW02KDGEmTSEFjQVBTllNwlg-8frfxrwXP4x9YmSNslbli3KfmIz2b-RHcobF4XSYVBox_pxVpezMCIBc3j6JtEuPSkvs3poE2v6FxTwnkPIPmXF5pfKEz_8wbbED2MS",
        category: "Cakes",
    },
    {
        id: 6,
        name: "Artisanal Butter Block",
        price: 7.0,
        unit: "Piece",
        rating: 5,
        description:
            "Hand-churned European-style butter with sea salt crystals.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHT1Jtqz-lnwWjFdHFTJa7tkw3uqkTiWx6OHGgO-7oIPRd-9gmQuWL6vszyBwRy3PZqudR7aKaIewm4D2cPRijdKXnS3DvbJgYCx_R-Ku1igGe2OiSJV5bBB4Lxdt6vGL3D0zGiRjlN0Uu2GazTbjSS8PAI2E9s25zNDFo6Tpj9oyG8jJaMho_4jie0ee-GVpPuovm0vXgEF0yyJM9bIY8-xczWG2yDArpEIb7AkHmvCQe_AZ7cWqV1B9m1GrlWjXu5Hhu5x9wYz79",
        category: "Butter",
        isPopular: true,
    },
];

export const categories = [
    { name: "All Products", count: 24, slug: "all" },
    { name: "Milk", count: 8, slug: "milk" },
    { name: "Mala", count: 4, slug: "mala" },
    { name: "Yoghurt", count: 6, slug: "yoghurt" },
    { name: "Bread", count: 3, slug: "bread" },
    { name: "Butter", count: 4, slug: "butter" },
    { name: "Cakes", count: 3, slug: "cakes" },
];
