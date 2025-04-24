import React from "react";
import man from "../assets/man.png";
import woman from "../assets/woman.png";

export default function LeaderBoard()
{
    return(
        <>
       <div class="container mx-auto">
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-3xl font-extrabold text-center mb-6">Weekly Leaderboard</h2>
            <table class="w-full table-auto">
                <thead>
                    <tr class="bg-gray-200 text-left">
                        <th class="px-4 py-2">Avatar</th>
                        <th class="px-4 py-2">Name</th>
                        <th class="px-4 py-2">Points</th>
                        <th class="px-4 py-2">Rank</th>
                        <th class="px-4 py-2">Achievements</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-gray-100">
                        <td class="border px-4 py-2"><img src={man} alt="Avatar" class="rounded-full" style={{ width:"80px", height:"80px"}}/></td>
                        <td class="border px-4 py-2">Aditya Mhaske</td>
                        <td class="border px-4 py-2">500</td>
                        <td class="border px-4 py-2">1</td>
                        <td class="border px-4 py-2">🏅</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2"><img src={woman} alt="Avatar" class="rounded-full" style={{ width:"80px", height:"80px"}}/></td>
                        <td class="border px-4 py-2">Aarohi Metkar</td>
                        <td class="border px-4 py-2">480</td>
                        <td class="border px-4 py-2">2</td>
                        <td class="border px-4 py-2">🥈</td>
                    </tr>
                    <tr class="bg-gray-100">
                        <td class="border px-4 py-2"><img src={woman} alt="Avatar" class="rounded-full" style={{ width:"80px", height:"80px"}}/></td>
                        <td class="border px-4 py-2">Isha Dashetwar</td>
                        <td class="border px-4 py-2">450</td>
                        <td class="border px-4 py-2">3</td>
                        <td class="border px-4 py-2">🥉</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2"><img src={woman} alt="Avatar" class="rounded-full" style={{ width:"80px", height:"80px"}}/></td>
                        <td class="border px-4 py-2">Vedashri Choudhari</td>
                        <td class="border px-4 py-2">420</td>
                        <td class="border px-4 py-2">4</td>
                        <td class="border px-4 py-2">🏆</td>
                    </tr>
                    <tr class="bg-gray-100">
                        <td class="border px-4 py-2"><img src={man} alt="Avatar" class="rounded-full" style={{ width:"80px", height:"80px"}}/></td>
                        <td class="border px-4 py-2">Yash Mehta</td>
                        <td class="border px-4 py-2">400</td>
                        <td class="border px-4 py-2">5</td>
                        <td class="border px-4 py-2">🎖️</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2"><img src={man} alt="Avatar" class="rounded-full" style={{ width:"80px", height:"80px"}}/></td>
                        <td class="border px-4 py-2">Varun Dhawan</td>
                        <td class="border px-4 py-2">380</td>
                        <td class="border px-4 py-2">6</td>
                        <td class="border px-4 py-2">🎗️</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

   
    <div class="container mx-auto mt-8">
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-3xl font-extrabold text-center mb-6">Rewards and Achievements</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 class="text-xl font-bold">Alia Bhatt</h3>
                    <p>Points: 2500</p>
                    <p>Achievement: Investment Ninja</p>
                    <p>⭐⭐⭐⭐⭐</p>
                </div>
                <div class="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 class="text-xl font-bold">Jane Smith</h3>
                    <p>Points: 2300</p>
                    <p>Achievement: Samurai Saver</p>
                    <p>⭐⭐⭐</p>
                </div>
                <div class="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 class="text-xl font-bold">David Lee</h3>
                    <p>Points: 2200</p>
                    <p>Achievement: Master Trader</p>
                    <p>⭐⭐⭐⭐⭐</p>
                </div>
                <div class="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 class="text-xl font-bold">Emma Watson</h3>
                    <p>Points: 2100</p>
                    <p>Achievement: Samurai Saver</p>
                    <p>⭐⭐⭐⭐</p>
                </div>
            </div>
        </div>
    </div>
        </>
    );
}