# Liquid War 6 is a unique multiplayer wargame.
# Copyright (C)  2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015  Christian Mauduit <ufoot@ufoot.org>
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
#
# Liquid War 6 homepage : http://www.gnu.org/software/liquidwar6/
# Contact author        : ufoot@ufoot.org

AM_CFLAGS = @LW6_CFLAGS@
AM_LDFLAGS = @LW6_LDFLAGS@

libdir = @libdir@/@PACKAGE_TARNAME@-@LW6_VERSION_BASE@/cli

noinst_LTLIBRARIES = libmod_tcp_s.la
MOD_TCP_FILES = mod-tcp-backend.c mod-tcp-data.c mod-tcp-info.c mod-tcp-message.c mod-tcp-oob.c mod-tcp-setup.c mod-tcp-state.c
libmod_tcp_s_la_SOURCES = $(MOD_TCP_FILES) 

pkglibdir = $(libdir)/@PACKAGE_TARNAME@/cli
if !ALLINONE
lib_LTLIBRARIES = libmod_tcp.la
libmod_tcp_la_SOURCES = $(MOD_TCP_FILES) 
libmod_tcp_la_LDFLAGS = -release @PACKAGE_VERSION@ @LW6_LDFLAGS@
libmod_tcpdir = $(includedir)/@PACKAGE_TARNAME@/cli/mod-tcp
libmod_tcp_HEADERS = mod-tcp.h
endif # !ALLINONE

EXTRA_DIST = mod-tcp-internal.h
