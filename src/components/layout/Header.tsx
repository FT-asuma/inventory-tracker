// src/components/layout/Header.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  Package,
  AlertTriangle,
  TrendingUp,
  Settings,
  X,
  Check,
  CheckCheck,
  ArrowRight,
} from "lucide-react";

export default function Header(info: {
  props: {
    role: string | undefined
  }
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const notifications = [
    {
      id: 1,
      type: "low-stock",
      message: "Coca-Cola 500ml is low (5 left)",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      type: "sale",
      message: "Large sale: $450 from John Doe",
      time: "15m ago",
      unread: true,
    },
    {
      id: 3,
      type: "alert",
      message: "Bread Loaf out of stock",
      time: "1h ago",
      unread: true,
    },
    {
      id: 4,
      type: "update",
      message: "New seller registered: Sarah M.",
      time: "3h ago",
      unread: false,
    },
    {
      id: 5,
      type: "low-stock",
      message: "Milk 1L is running low (7 left)",
      time: "4h ago",
      unread: false,
    },
    {
      id: 6,
      type: "sale",
      message: "Bulk order: $1,200 from ABC Store",
      time: "5h ago",
      unread: false,
    },
    {
      id: 7,
      type: "alert",
      message: "Lays Chips critically low (3 left)",
      time: "6h ago",
      unread: false,
    },
    {
      id: 8,
      type: "update",
      message: "Price updated: Pepsi 1L",
      time: "8h ago",
      unread: false,
    },
  ];

  const infoList = [
    {
      name: "Sales",
      numb: 46,
      color: "bg-orange-400",
    },
    {
      name: "Orders",
      numb: 45,
      color: "bg-blue-500",
    },
    {
      name: "Active",
      numb: 12,
      color: "bg-green-500",
    },
    {
      name: "Low Stock",
      numb: 8,
      color: "bg-orange-500",
    },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    // Implement mark all as read logic here
    console.log("Mark all as read");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Search */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, sellers, orders..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 
                         text-sm text-gray-900 placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-gray-400 bg-white border border-gray-200 rounded">
              /
            </kbd>
          </div>
        </div>

        {/* Center: Quick Stats Pills */}
        <div className="hidden lg:flex items-center gap-2">
          {info?.props?.role !== "user" && infoList.map((e, index) => (
            <div key={index} className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-sm">
                <div className={`w-2 h-2 rounded-full ${e.color}`} />
                <span className="text-sm font-semibold text-gray-900">
                  {e.numb}
                </span>
                <span className="text-xs text-gray-500">{e.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-4.5 px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-lg"
                >
                  {/* Notification Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handleMarkAllRead}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Mark all as read"
                      >
                        <CheckCheck className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Settings className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-80 overflow-auto">
                    {notifications.slice(0, 4).map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer transition-colors ${
                          notif.unread ? "bg-gray-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notif.type === "low-stock"
                                ? "bg-orange-500"
                                : notif.type === "sale"
                                  ? "bg-green-500"
                                  : notif.type === "alert"
                                    ? "bg-red-500"
                                    : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {notif.time}
                            </p>
                          </div>
                          {notif.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="p-3 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        setShowAllNotifications(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                    >
                      View All Notifications
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200" />

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">
                Special Freight Solutions
              </p>
              <p className="text-xs text-gray-500">Company ID: 6163768</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm shadow-sm">
              SF
            </div>
          </div>
        </div>
      </div>

      {/* Full Notifications Modal/Drawer */}
      <AnimatePresence>
        {showAllNotifications && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllNotifications(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-200 shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gray-50/50">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Notifications
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {unreadCount} unread messages
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMarkAllRead}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                  <button
                    onClick={() => setShowAllNotifications(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 p-4 border-b border-gray-200">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg">
                  All
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  Unread
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  Alerts
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  Sales
                </button>
              </div>

              {/* Notifications List */}
              <div className="overflow-auto h-[calc(100vh-180px)]">
                {notifications.map((notif, index) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      notif.unread ? "bg-gray-50/70" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                          notif.type === "low-stock"
                            ? "bg-orange-100"
                            : notif.type === "sale"
                              ? "bg-green-100"
                              : notif.type === "alert"
                                ? "bg-red-100"
                                : "bg-blue-100"
                        }`}
                      >
                        {notif.type === "low-stock" ? (
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                        ) : notif.type === "sale" ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : notif.type === "alert" ? (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        ) : (
                          <Package className="w-4 h-4 text-blue-600" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notif.time}
                        </p>
                      </div>

                      {notif.unread && (
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Empty State */}
                {notifications.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Bell className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-sm font-medium text-gray-900">
                      No notifications
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      You're all caught up!
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Stats */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50/50 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    {notifications.filter((n) => n.unread).length} unread
                  </span>
                  <span className="text-gray-500">
                    {notifications.length} total
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
