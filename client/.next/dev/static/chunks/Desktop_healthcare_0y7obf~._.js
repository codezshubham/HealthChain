(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/healthcare/client/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDashboardPathForRole",
    ()=>getDashboardPathForRole,
    "getToken",
    ()=>getToken,
    "getUser",
    ()=>getUser,
    "logout",
    ()=>logout,
    "setAuth",
    ()=>setAuth
]);
const setAuth = (token, user)=>{
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};
const getUser = ()=>{
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};
const getToken = ()=>{
    return localStorage.getItem("token");
};
const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
};
const getDashboardPathForRole = (role)=>{
    if (role === "PATIENT") return "/dashboard/patient";
    if (role === "DOCTOR") return "/dashboard/doctor";
    if (role === "GOVERNMENT") return "/dashboard/government";
    return "/dashboard";
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PatientDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/healthcare/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/healthcare/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/healthcare/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$client$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/healthcare/client/lib/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PatientDashboard() {
    _s();
    const [records, setRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientDashboard.useEffect": ()=>{
            const init = {
                "PatientDashboard.useEffect.init": async ()=>{
                    const stored = localStorage.getItem("user");
                    if (!stored) {
                        router.replace("/auth/login");
                        return;
                    }
                    const user = JSON.parse(stored);
                    // Only PATIENTs can access this dashboard
                    if (user.role !== "PATIENT") {
                        const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$client$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDashboardPathForRole"])(user.role);
                        router.replace(target);
                        return;
                    }
                    const res = await fetch(`http://localhost:5000/api/patient/${user.patientId}/history`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    const data = await res.json();
                    setRecords(data);
                }
            }["PatientDashboard.useEffect.init"];
            init();
        }
    }["PatientDashboard.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-bold mb-4",
                children: "My Medical History"
            }, void 0, false, {
                fileName: "[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: records.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-4 rounded shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Disease:"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx",
                                        lineNumber: 52,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    r.disease
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Hospital:"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    r.hospitalName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Date:"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx",
                                        lineNumber: 54,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    new Date(r.date).toDateString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/healthcare/client/app/dashboard/patient/page.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(PatientDashboard, "QW1T4Pg3lB9wFc3A0/L3Np1VNTY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$healthcare$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PatientDashboard;
var _c;
__turbopack_context__.k.register(_c, "PatientDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/healthcare/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Desktop/healthcare/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Desktop_healthcare_0y7obf~._.js.map