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

noinst_LTLIBRARIES = libker.la
if LW6_CUNIT
TEST_SRC_FILE = ker-test.c
else # LW6_CUNIT
TEST_SRC_FILE =
endif # LW6_CUNIT
libker_la_SOURCES = ker-armies.c ker-capture.c ker-checksumlog.c ker-cursor.c ker-cursorarray.c ker-fighter.c ker-gamestate.c ker-gamestruct.c ker-hexa.c ker-history.c ker-mapstate.c ker-mapstruct.c ker-move.c ker-node.c ker-nodearray.c ker-placestruct.c ker-score.c ker-scorearray.c ker-slotstate.c ker-slotstruct.c ker-spread.c ker-tables.c ker-team.c ker-teammask.c $(TEST_SRC_FILE) ker-trigo.c ker-weapon.c ker-zonestate.c ker-zonestruct.c
libkerdir= $(includedir)/@PACKAGE_TARNAME@/ker
libker_HEADERS = ker.h 

if LW6_CUNIT
if !FULLSTATIC
libexec_PROGRAMS = liquidwar6ker-test
liquidwar6ker_test_SOURCES = ker-testmain.c
liquidwar6ker_test_LDADD = libker.la ../map/libmap.la ../sys/libsys.la @LW6_LIBINTL_LDADD@
TESTS = liquidwar6ker-test
endif # !FULLSTATIC
endif # LW6_CUNIT

EXTRA_DIST = ker-internal.h ker-trigo.h trigo.py

clean-local:
	rm -f *.log *.trs

